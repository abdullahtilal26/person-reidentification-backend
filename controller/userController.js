const fs = require("fs");
const fsa = require("fs").promises;
const path = require("path");
const util = require("util");
const Busboy = require("busboy");

const {
  createDirectory,
  getDirectoryByIdAndPath,
  deleteDirectory,
} = require("../services/manageVideosService");

const directoryPath = "../person-reidentification-backend/public/upload";
const mkdir = util.promisify(fs.mkdir);

const makeDirectory = async (dirPath) => {
  try {
    await mkdir(dirPath);
    console.log("Directory created successfully!");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const isDirectoryExist = async (userId, dirPath) => {
  const _exist = await getDirectoryByIdAndPath(userId, dirPath);
  return _exist;
};

const createDirectoryOnServer = async (req, res) => {
  const directoryName = req.body.directoryName;
  const userId = req.body.userId;
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

const deleteOnServer = async (dirPath) => {
  try {
    const files = await fsa.readdir(dirPath);
    for (const file of files) {
      const filePath = `${dirPath}/${file}`;
      const fileStat = await fsa.stat(filePath);
      if (fileStat.isDirectory()) {
        await deleteDirectory(filePath);
      } else {
        await fsa.unlink(filePath);
      }
    }

    await fsa.rmdir(dirPath);
    console.log("Directory deleted successfully");
    return true;
  } catch (err) {
    console.error("Error while deleting directory", err);
    return false;
  }
};

const deleteDirectoryOnServer = async (req, res) => {
  const directoryName = req.body.directoryName;
  const userId = req.body.userId;
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

const uploadVideoOnServerDirectory = async (req, res) => {
  let userId = "";
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
      if (name === "userId") {
        userId = value;
      }
    });
  });

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

module.exports = {
  createDirectoryOnServer,
  deleteDirectoryOnServer,
  uploadVideoOnServerDirectory,
};
