const { uploadVideosToBucket } = require("../services/manageVideosService");

const uploadVideos = async (req, res) => {
  console.log("Files Uploaded");
  console.log(req.files);
  console.log("Body");
  console.log(req.body);

  const videoFiles = req.files;
  const uploaded = await uploadVideosToBucket(videoFiles);

  return res.json({ status: uploaded });
};

module.exports = { uploadVideos };
