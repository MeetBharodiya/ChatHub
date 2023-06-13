const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser")

dotenv.config();

const port = process.env.PORT || 8001;

app.use(express.json());

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieparser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected.......");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/auth",require("./routes/auth"));
app.use("/verifytoken",require("./routes/verification"));

app.listen(port, () => {
  console.log("Running........");
});
