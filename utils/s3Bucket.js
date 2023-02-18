const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const uploadVideosToBucket = async (videoFiles) => {
  let isUploaded = 0;
  for (let i = 0; i < videoFiles.length; i++) {
    console.log(`Video File Name: ${videoFiles[i].originalname}`);
    let fileName = videoFiles[i].originalname;
    let fileBuffer = videoFiles[i].buffer;
    let fileContent = videoFiles[i].mimetype;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileContent,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    isUploaded += 1;
  }
  return isUploaded === videoFiles.length ? true : false;
};
