const AWS = require("aws-sdk")
const fs = require('fs')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    bucketRegion,
    accessKey,
    secretKey
})

// Uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams);
}

exports.uploadFile = uploadFile


// Downloads a file from s3
