const express = require("express");
const router = express.Router();
const { addUser, mailCredentialsToUser, getUsers, deleteUser } = require("../controller/adminController");

router.route("/adduser").post(addUser);
router.route("/adduser/sendmail").post(mailCredentialsToUser);
router.route("/getusers").get(getUsers);
router.route("/deleteuser").delete(deleteUser);

module.exports = router;
// const { addEmailToRole } = require("../services/authRoleService");
// router.route("/do").post(addEmailToRole);