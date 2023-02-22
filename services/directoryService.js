const util = require("util");
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

module.exports = { makeDirectory, deleteOnServer };
