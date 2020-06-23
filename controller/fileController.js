let fs = require('fs');
let FileModel = require('./../model/fileModel');
let catchAsync = require('../util/catchAsync');
let cloudinary = require('../fileSetting/cloudinarySetting');
let path = require('path'); 
 
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
