
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean,
},{
    versionKey:false
});

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel