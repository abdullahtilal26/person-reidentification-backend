const express = require("express");
const { createDirectoryOnServer, deleteDirectoryOnServer } = require("../controller/userController");

const router = express.Router();


router.route("/folder").post(createDirectoryOnServer).delete(deleteDirectoryOnServer);

module.exports = router;