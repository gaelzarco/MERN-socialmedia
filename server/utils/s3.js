const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config()
const crypto = require('crypto')
const sharp = require('sharp')

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    },
    region: bucketRegion
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

// Uploads a file to s3
exports.uploadFile = async (file) => {
    // const buffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()
    const imageName = randomImageName()

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    return imageName
}

// Downloads a file from s3
exports.getFile = async (imageName) => {
    const params = {
        Bucket: bucketName,
        Key: imageName
    }

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

    return url
}