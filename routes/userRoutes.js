const express = require("express");
const {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
  uploadVideoOnServerDirectory,
} = require("../controller/userController");

const router = express.Router();

router
  .route("/folder")
  .post(createDirectoryOnServer)
  .delete(deleteDirectoryOnServer);

router.route("/uploadVideo").post(uploadVideoOnServerDirectory);

module.exports = router;
