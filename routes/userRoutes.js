const express = require("express");
const {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
  uploadVideoOnServerDirectory,
  getDirectoriesOnServer,
} = require("../controller/userController");

const router = express.Router();

router
  .route("/folder")
  .post(createDirectoryOnServer)
  .delete(deleteDirectoryOnServer)
  .get(getDirectoriesOnServer);

router.route("/uploadVideo").post(uploadVideoOnServerDirectory);

module.exports = router;
