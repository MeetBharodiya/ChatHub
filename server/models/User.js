const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return val.toString().match(/^\(?(\d{3})\)?[- ]?(\d{3})[-]?(\d{4})$/) || val.toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      },
      message: (val) => `${val.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
},{timestamps:true});

const User = mongoose.model("User",UserSchema);
module.exports = User;
