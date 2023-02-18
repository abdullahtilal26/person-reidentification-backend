const db = require("../models");
const Directories = db.directories;

const errorHandler = (err) => {
  console.log("Error:\n", err);
};

const getDirectoryByIdAndPath = async (userId, directoryPath) => {
  const _directory = await Directories.findOne({
    where: {
      dirpath: directoryPath,
      userId: userId,
    },
  }).catch(errorHandler);
  return _directory ? true : false;
};

const createDirectory = async (userId, directoryPath) => {
  const _directory = await Directories.create({
    userId: userId,
    dirpath: directoryPath,
  }).catch(errorHandler);
  return _directory ? true : false;
};

const deleteDirectory = async (userId, directoryPath) => {
  const _directory = await Directories.destroy({
    where: {
      userId: userId,
      dirpath: directoryPath,
    },
  }).catch(errorHandler);
  return _directory ? true : false;
};

module.exports = { createDirectory, getDirectoryByIdAndPath, deleteDirectory };
