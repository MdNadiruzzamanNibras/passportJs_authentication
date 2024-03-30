const express = require("express");
const { handleRegister } = require("../Controller/userController");
const passport = require("passport");
require("../config/passport.js");
const router = express.Router();

router.post("/registration", handleRegister);

router.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/protect" })
);

router.get("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
router.get("/protect", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("protected");
  } else {
    res.status(401).send({ meg: "Unauthrozied" });
  }
});
// router.post("/login", function (req, res, next) {
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: info.message });
//     }
//     // Custom behavior on successful authentication
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.json({ message: "Login successful", user });
//     });
//   })(req, res, next);
// });

router.get("/new", (req, res) => {
  res.send("hello login");
});
module.exports = router;
