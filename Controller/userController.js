const { hashSync } = require("bcrypt");
const User = require("../models/userModel");

const handleRegister = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: hashSync(req.body.password, 12),
    });
    console.log(user);
    user.save().then((user) => console.log(user));
    res.send({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleRegister };
