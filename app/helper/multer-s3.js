var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
// const User = require('../modules/user/models/user.model');

aws.config.update({
    secretAccessKey: 'Yakl2NuBY3nXtHtRp6OoUnRCWdaIn6iwR1WsuLCV',
    accessKeyId: 'AKIAJAVMLIMYL4TYRCXQ',
});
var s3 = new aws.S3()

exports.upload1 = (folder, req) => multer({
    storage: multerS3({
        s3: s3,
        bucket: 'taranjeet10',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log("hbzc : ",file)
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: async function (req, file, cb) {
            let extension = file.originalname.split(".");
            cb(null, `${folder}/${extension[0]}${Date.now().toString()}.${extension[1]}`)
        }
    })
})

// to delte multiple images
exports.deleteFile = (imagePath) => {
    console.log("hc",imagePath)
    s3.deleteObjects({
        Bucket: "jolimages",
        Key: imagePath
    }, function (err, data) {
        if (data) console.log(data, "success");
        // if (err) throw err.errors;
    })
}

// to delete a single image
exports.deleteImage = (imagePath) => {
    s3.deleteObject({
        Bucket: "jolimages",
        Key: imagePath
    }, function (err, data) {
        if (data) console.log(data, "success");
        if (err) throw err.errors;
    })
}

exports.getFile = (imagePath) => {

}