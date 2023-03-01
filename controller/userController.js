const fs = require("fs");
const Busboy = require("busboy");
const path = require("path");

const {
  createDirectory,
  getDirectoryByIdAndPath,
  deleteDirectory,
  getAllDirectoriesById,
} = require("../services/manageVideosService");
const {
  makeDirectory,
  deleteOnServer,
} = require("../services/directoryService");

const directoryPath = process.env.UPLOAD_DIRECTORY;

const isDirectoryExist = async (userId, dirPath) => {
  const _exist = await getDirectoryByIdAndPath(userId, dirPath);
  return _exist;
};

const createDirectoryOnServer = async (req, res) => {
  const directoryName = req.body.directoryName;
  const userId = req.user.user_id;
  let dirPath = directoryPath + "/" + userId + "_" + directoryName;

  const isDir = await isDirectoryExist(userId, dirPath);

  if (isDir)
    return res
      .status(404)
      .json({ message: "Directory exist on server", status: false });

  let makeDirectoryOnServer = await makeDirectory(dirPath);
  if (!makeDirectoryOnServer)
    return res
      .status(404)
      .json({ message: "Can not create directory on server", status: false });

  const directory = await createDirectory(userId, dirPath);
  if (!directory)
    return res
      .status(404)
      .json({ message: "Can not store Directory in database", status: false });
  else
    return res
      .status(200)
      .json({ message: "Directory created successfully!", status: true });
};

const deleteDirectoryOnServer = async (req, res) => {
  const directoryName = req.body.directoryName;
  const userId = req.user.user_id;
  let dirPath = directoryPath + "/" + userId + "_" + directoryName;

  const _exist = await isDirectoryExist(userId, dirPath);
  if (!_exist)
    return res
      .status(404)
      .json({ message: "Directory doesnot exist on server", status: false });

  const isDeletedOnServer = await deleteOnServer(dirPath);
  console.log("Direc removed: ", isDeletedOnServer);
  if (!isDeletedOnServer)
    return res
      .status(404)
      .json({ message: "Can not delete directory on server", status: false });

  const isRemoved = await deleteDirectory(userId, dirPath);

  if (!isRemoved)
    return res
      .status(404)
      .json({ message: "Can not delete directory", status: false });
  else {
    return res
      .status(200)
      .json({ message: "Directory deleted successfully", status: true });
  }
};
const uploadFileToFlask = () => {};
const uploadFilesFromFolderToFlaskServer = async (req, res) => {
  const { folderName } = req.body;
  const userId = req.user.user_id;
  const readPath = directoryPath + "/" + userId + "_" + folderName;

  fs.cp(readPath, "../flask/upload", { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.send("copy");
};
const uploadVideoOnServerDirectory = async (req, res) => {
  let userId = req.user.user_id;
  let folderName = "";

  const busboy = Busboy({ headers: req.headers });

  let chunkFile = [];
  async function handleError(fn) {
    try {
      await fn();
    } catch (e) {
      req.unpipe(busboy);

      next(e);
    }
  }

  busboy.on("field", (name, value) => {
    handleError(() => {
      // process fields
      if (name === "folderName") {
        folderName = value;
      }
    });
  });

  busboy.on("file", (name, stream, filename, encoding, contentType) => {
    handleError(() => {
      const time = new Date();
      filename.filename = time.getTime() + "_" + filename.filename;

      let uploadPath =
        directoryPath +
        "/" +
        userId +
        "_" +
        folderName +
        "/" +
        filename.filename;

      stream.on("data", (chunk) => {
        chunkFile.push(chunk);
      });
      stream.pipe(fs.createWriteStream(uploadPath));
    });
  });
  busboy.on("finish", () => {
    handleError(() => {
      // send response
      console.log("File  upload Finish For User", userId);
      return res.json({ message: "Success Upload Against User ", userId });
    });
  });

  req.pipe(busboy);
};

const getDirectoriesOnServer = async (req, res) => {
  const userId = req.user.user_id;
  const _directories = await getAllDirectoriesById(userId);
  if (!_directories || _directories.length == 0)
    return res
      .status(404)
      .json({ message: "No directories exist", status: false });
  else {
    let directoriesName = [];
    _directories.forEach((element) => {
      let path = element.dataValues.dirpath;
      directoriesName.push(path);
    });
    return res.status(200).json({ message: directoriesName, status: true });
  }
};

const getVideosNameFromDirectory = async (req, res) => {
  const folderName = req.body.directory;
  const directoryName =
    directoryPath + "/" + req.user.user_id + "_" + folderName;

  const _isDirectory = await isDirectoryExist(req.user.user_id, directoryName);
  if (!_isDirectory)
    return res
      .status(404)
      .json({ message: "No directories exist", status: false });
  fs.readdir(directoryName, (err, files) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .joson({ message: "Server error", status: false });
    }
    const videos = files.filter(
      (file) => path.extname(file).toLowerCase() === ".mp4"
    ); 
    if (videos.length > 0)
      return res.status(200).json({ videos: videos, status: true });
    else
      return res
        .status(404)
        .json({ message: "No videos exist", status: false });
  });
};

const uploadQueryImage = (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.status(404).json({
      status: false,
    });
  } else {
    console.log("file received", req.file);
    return res.status(200).json({
      status: true,
    });
  }
};

const deleteQueryImage = async (req, res) => {
  const crop = process.env.CROP;
  const folder = crop + req.user.user_id;
  const isDeleted = await deleteOnServer(folder);
  if (isDeleted) return res.status(200).json({ status: true });
  else return res.status(404).json({ status: false });
};

module.exports = {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
  uploadVideoOnServerDirectory,
  getDirectoriesOnServer,
  uploadQueryImage,
  deleteQueryImage,
  uploadFilesFromFolderToFlaskServer,
  getVideosNameFromDirectory,
};
