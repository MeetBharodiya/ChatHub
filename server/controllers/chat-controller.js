const dotenv = require("dotenv");
const Chat = require("../models/Chat");
dotenv.config();

class PageController {
  async getChat(req, res) {
    const { input } = req.body.message;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: JSON.stringify(input) }],
      }),
    };

    try {
      const user = await Chat.find({ userID: req.id });
      if (user.length === 0 || user[0]?.counter < 5) {
        await fetch("https://api.openai.com/v1/chat/completions", options)
          .then((res) => res.json())
          .then(async (data) => {
            let ans = data.choices[0].message.content;
            const obj = {
              question: input,
              answer: ans,
            };
            const filter = {
              userID: req.id,
            };
            const update = {
              $push: { history: obj },
              $inc: { counter: 1 },
            };
            const updatedData = await Chat.findOneAndUpdate(filter, update, {
              upsert: true,
              new: true,
            });
            res.status(200).json(updatedData.history);
            // res.status(200).json({ message: "Successfully Answered" });
          });
      } else {
        const filter = {
          userID: req.id,
        };
        const update = {
          counter: 0,
        };
        await Chat.findOneAndUpdate(filter, update, {
          new: true,
        });
        res.status(200).json({
          message:
            "You reached your limit!! Are you want to reset your account??",
        });
      }
    } catch (error) {
      console.log("error", error);
      res.status(401).json({ message: "Something went wrong" });
    }
  }
}

module.exports = new PageController();
