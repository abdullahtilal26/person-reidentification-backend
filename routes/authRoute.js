const express = require("express");
const router = express.Router();
const { login } = require("../controller/authController");

router.route("/login").post(login);

module.exports = router;
