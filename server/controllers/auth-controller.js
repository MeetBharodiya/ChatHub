const User = require("../models/User");
const bcrypt = require("bcrypt");
const tokenservice = require("../services/token-service");

class AuthController {
  async signup(req, res) {
    try {
      let { username, password } = req.body;
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          error: "User already exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = await User.create({
        username,
        password,
      });
      res.json({user,message:"Account created successfully"});
    } catch (err) {
      console.log("err", err);
      res.send(err);
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).json({ error: "User does not exist" });
      } else {
        const comparepassword = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
          res.status(400).json({ error: "Enter the correct credentials" });
        } else {
          const token = await tokenservice.generateToken(user._id);
          res
            .status(200)
            .json({ user, token, message: "Loggedin Successfully" });
        }
      }
    } catch (error) {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
}

module.exports = new AuthController();
