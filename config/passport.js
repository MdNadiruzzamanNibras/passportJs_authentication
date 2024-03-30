const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { compareSync } = require("bcrypt");
const User = require("../models/userModel");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    console.log(username, password, "passport login");
    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      if (!compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
