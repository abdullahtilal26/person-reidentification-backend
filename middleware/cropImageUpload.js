const multer = require("multer");
const { makeDirectory } = require("../services/directoryService");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let cropQuery = process.env.CROP;
    let cropPath = cropQuery + req.user.user_id;
    let isDirectory = await makeDirectory(cropPath);
    if (isDirectory) cb(null, cropPath);
    else cb(null, cropQuery);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

fileStorage = {
  storage: storage,
};
module.exports = { fileStorage };
