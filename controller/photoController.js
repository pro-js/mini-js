let catchAsync = require('../util/catchAsync');
let cloudinary = require('./../cloudinary/cloudinarySetting');

exports.photoUpload = catchAsync(async (req, res, next) => {
  await cloudinary.uploader.upload("me1.jpg")
    .then((result) => {
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
