
// // associations

// db.user.hasMany(db.directories, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
// });

// db.directories.belongsTo(db.user);


// database connection


// db.sequelize
// .query(`ALTER TABLE directories DROP PRIMARY KEY`)
// .then(() => {
//     console.log("Primary key constraint drop!");
// })
// .catch((error) => {
//     console.error("Error droping primary key constraint:", error);
// });

// db.sequelize
// .query(`ALTER TABLE directories ADD PRIMARY KEY (userId, dirpath)`)
// .then(() => {
//     console.log("Primary key constraint added successfully!");
// })
// .catch((error) => {
//     console.error("Error adding primary key constraint:", error);
// });

// const isDirectoryNotPresent = (dirPath) => {
//   return new Promise((resolve, reject) => {
//     fs.stat(dirPath, (err, stats) => {
//       if (err) {
//         if (err.code === "ENOENT") {
//           console.log("isDir: ", err);
//           resolve(true);
//         } else {
//           reject(err);
//         }
//       }
//       if (stats.isDirectory()) {
//         console.log("The path is a directory.");
//         reject(false);
//       } else {
//         console.log("The path is not a directory.");
//         resolve(true);
//       }
//     });
//   });
// };

// const isDir = await isDirectoryNotPresent(dirPath)
//     .then((result) => {
//       console.log("In Resolve " + result);
//       return true;
//     })
//     .catch((err) => {
//       console.log("In error catch " + err);
//       return false;
//     });

// const getDirectories = async (source, callback) => {
//   await fs.readdir(source, { withFileTypes: true }, (err, files) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(
//         files
//           .filter((dirent) => dirent.isDirectory())
//           .map((dirent) => dirent.name)
//       );
//     }
//   });
// };

// const callbackFolders = async (_folders) => {
//   if (_folders.length == 0) {
//     console.log(_folders);
//     return;
//   }
//   console.log(_folders);
//   folders = _folders;
// };

// const getFolderNames = async () => {
//   await getDirectories(directoryPath, callbackFolders);
//   if (folders !== null && folders.length == 0) return null;
//   return folders;
// };

