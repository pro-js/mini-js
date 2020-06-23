let fs = require('fs');
let catchAsync = require('./../util/catchAsync');
let cloudinary = require('./../photoSetting/cloudinarySetting');
let path = require('path'); 
 
exports.photoUpload = catchAsync(async (req, res, next) => {
  //let extension = path.extname(req.file.originalname);
  let fileInfo = req.file.path
    await cloudinary.uploader.upload(fileInfo)
  .then((result) => {
    fs.unlinkSync(fileInfo);
    res.status(200).send({
      message: "success",
      result,
    });
  }).catch((error) => {
    res.status(500).send({
      message: "failure",
      error,
    });
  }); 
});
