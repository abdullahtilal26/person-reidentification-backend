const express = require("express");
const {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
  getDirectoriesOnServer,
} = require("../controller/userController");

const router = express.Router();

router
  .route("/folder")
  .post(createDirectoryOnServer)
  .delete(deleteDirectoryOnServer)
  .get(getDirectoriesOnServer);

module.exports = router;
