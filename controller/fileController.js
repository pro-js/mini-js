let fs = require('fs');
let FileModel = require('./../model/fileModel');
let catchAsync = require('../util/catchAsync');
let cloudinary = require('../config/cloudinarySetting');
let deleteCloudinary = require('cloudinary');
  
exports.fileUpload = catchAsync(async (req, res, next) => {
  //let extension = path.extname(req.file.originalname);
  let fileInfo = req.file.path
  await cloudinary.uploader.upload(fileInfo)
  .then(async (result) => {
    // create a file collection on FileModel
    let fileCreate = await FileModel.create(result);
    fileCreate.version = undefined;
    fileCreate.signature = undefined;
    fileCreate.created_at = undefined;
    fileCreate.secure_url = undefined;

    // send response
    res.status(201).send({
      message: "success",
      data: {
        fileCreate
      },
    });
  }).catch((error) => {
    res.status(500).send({
      message: "failure",
      error,
    });
  }).finally(() => {
    // remove up file from temp directory
    fs.unlinkSync(fileInfo);
  });
});

exports.getAllFiles = catchAsync(async (req, res, next) => {
  let fileData = await FileModel.find();
  res.status(200).json({
    status: 'ok',
    lenght: fileData.length,
    data: {
      fileData
    }
  });
});

exports.destroyFiles = catchAsync(async (req, res, next) => {
  let publicID = req.body.public_id;
   deleteCloudinary.v2.uploader.destroy(publicID, async function(error, result) {
    if (result) {
      await FileModel.deleteOne({ public_id: publicID });
      res.json({
        status: 'ok',
        message: 'Successfully Delete this File!'
      });
    }
    else {
      res.status(500).send({
        status: 'failure',
        message: 'Not Found this ID !!!',
      });
    }
  });
});