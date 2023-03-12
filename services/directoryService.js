const util = require("util");
const path = require("path");
const fs = require("fs");
const fsa = require("fs").promises;
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

const deleteOnServer = async (dirPath) => {
  try {
    const files = await fsa.readdir(dirPath);
    for (const file of files) {
      const filePath = `${dirPath}/${file}`;
      const fileStat = await fsa.stat(filePath);
      if (fileStat.isDirectory()) {
        await deleteOnServer(filePath);
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

const getVideosListFromDirectory = (folder) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if (err) reject(err);
      else {
        console.log("Files");
        console.log(files);
        var videos = files.filter((file) => {
          return path.extname(file).toLowerCase() === ".mp4";
        });
        console.log(videos);
        let _videos = videos.map((video) => {
          let folderPathSplit = folder.split("\\");
          let _folderName = folderPathSplit[folderPathSplit.length - 1];
          let _fileName = path.join(
            process.env.BASE_VIDEO_URI,
            "upload",
            _folderName,
            video
          );
          return _fileName;
        });
        resolve(_videos);
      }
    });
  });
};

const CopyVideosToFlaskServerDirectory = (sourceDir, targetDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      for (let index = 0; index < files.length; index++) {

        const sourceFilePath = path.join(sourceDir, files[index]);
        const targetFilePath = path.join(targetDir, files[index]);

        console.log(sourceFilePath)
        console.log(targetFilePath)

        fs.copyFile(sourceFilePath, targetFilePath, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });
      }

      resolve(`Files Transfer successfully`);
    });
  });
};

module.exports = {
  makeDirectory,
  deleteOnServer,
  getVideosListFromDirectory,
  CopyVideosToFlaskServerDirectory,
};
