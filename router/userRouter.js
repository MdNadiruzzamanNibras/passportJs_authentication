const express = require("express");
const { handleRegister } = require("../Controller/userController");
const router = express.Router();

router.post("/registration", handleRegister);

module.exports = router;
