const express = require("express");
const router = express.Router();
const { addUser, mailCredentialsToUser } = require("../controller/adminController");

router.route("/adduser").post(addUser);
router.route("/adduser/sendmail").post(mailCredentialsToUser);

module.exports = router;
// const { addEmailToRole } = require("../services/authRoleService");
// router.route("/do").post(addEmailToRole);