const express = require("express");
const router = express.Router();
const { addUser } = require("../controller/adminController");

router.route("/adduser").post(addUser);

module.exports = router;
