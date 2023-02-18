const express = require("express");
const router = express.Router();
const { addUser, mailCredentialsToUser, getUsers, deleteUser, updateUser } = require("../controller/adminController");

router.route("/adduser").post(addUser);
router.route("/adduser/sendmail").post(mailCredentialsToUser);
router.route("/getusers").get(getUsers);
router.route("/deleteuser").delete(deleteUser);
router.route("/updateuser").put(updateUser);

module.exports = router;