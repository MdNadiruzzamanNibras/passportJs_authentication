const { hashSync } = require("bcrypt");
const User = require("../models/userModel");

const handleRegister = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
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
