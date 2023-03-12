// const retrieveAllVideosFromFolder = async (req, res) => {
//     const { folderName } = req.body;
//     console.log(folderName);
//     const userId = req.user.user_id;
//     const dirPath = directoryPath + "/" + userId + "_" + folderName;
  
//     async.waterfall(
//       [
//         function (callback) {
//           let fileArray = [];
//           fs.readdir(dirPath, (err, files) => {
//             if (err) {
//               console.error(err);
//               callback(err, fileArray);
//             }
//             fileArray = files.filter(
//               (file) => path.extname(file).toLowerCase() === ".mp4"
//             );
//             console.log(fileArray);
//             callback(null, fileArray);
//           });
//         },
//         async function (fileArray, callback) {
//           console.log("--", fileArray);
//           const videos = [];
  
//           for (const file of fileArray) {
//             console.log(file);
//             const filePath = `${dirPath}/${file}`;
//             const fileStat = fs.stat(filePath);
//             console.log(fileStat);
//             if (!fileStat.isDirectory() && file.endsWith(".mp4")) {
//               const video = fs.readFileSync(filePath);
//               console.log(video);
//               videos.push({
//                 name: file,
//                 video: video.toString("base64"),
//               });
//             }
  
//             console.log(videos);
//             callback(null, videos);
//           }
//         },
//       ],
//       (err, result) => {
//         if (err) {
//           res.status(500).send("Error while fetching videos");
//         }
//         return result;
//       }
//     );
//   };
  