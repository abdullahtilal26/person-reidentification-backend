const express = require("express");
const {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
<<<<<<< .merge_file_a15820
  uploadVideoOnServerDirectory,
=======
  getDirectoriesOnServer,
>>>>>>> .merge_file_a16684
} = require("../controller/userController");

const router = express.Router();

router
  .route("/folder")
  .post(createDirectoryOnServer)
<<<<<<< .merge_file_a15820
  .delete(deleteDirectoryOnServer);

router.route("/uploadVideo").post(uploadVideoOnServerDirectory);

=======
  .delete(deleteDirectoryOnServer)
  .get(getDirectoriesOnServer);

>>>>>>> .merge_file_a16684
module.exports = router;
