const express = require("express");
const router = express.Router();
const { addUser, mailCredentialsToUser, getUsers } = require("../controller/adminController");

router.route("/adduser").post(addUser);
router.route("/adduser/sendmail").post(mailCredentialsToUser);
router.route("/getusers").get(getUsers);

module.exports = router;
// const { addEmailToRole } = require("../services/authRoleService");
// router.route("/do").post(addEmailToRole);