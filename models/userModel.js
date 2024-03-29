const mongoose = require("mongoose");

const userSchma = mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchma);

module.exports = User;
