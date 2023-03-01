const express = require("express");
const multer = require("multer");
const {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
  uploadVideoOnServerDirectory,
  getDirectoriesOnServer,
  uploadQueryImage,
  deleteQueryImage,
  uploadFilesFromFolderToFlaskServer,
  getVideosNameFromDirectory,
} = require("../controller/userController");

const { fileStorage } = require("../middleware/cropImageUpload");
const upload = multer({ storage: fileStorage.storage });
const router = express.Router();

router
  .route("/folder")
  .post(createDirectoryOnServer)
  .delete(deleteDirectoryOnServer)
  .get(getDirectoriesOnServer);

router.route("/uploadVideo").post(uploadVideoOnServerDirectory);

router.route("/getVideosFileNames").get(getVideosNameFromDirectory);

router
  .route("/cropQuery")
  .post(upload.single("query"), uploadQueryImage)
  .delete(deleteQueryImage);

router.route("/copy").post(uploadFilesFromFolderToFlaskServer);
module.exports = router;
