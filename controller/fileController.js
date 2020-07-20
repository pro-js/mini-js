const FileModel = require('./../model/fileModel');
const catchAsync = require('../util/catchAsync');
const cloudinary = require('../config/cloudinarySetting');
const deleteCloudinary = require('cloudinary');
const Formidable = require('formidable');

exports.fileUpload = catchAsync(async (req, res, next) => {
  const form = new Formidable();
   form.parse (req, (err, fields, files) => {
    if (err) return next(err);

    let filePath = files.upload.path;
    cloudinary.uploader.upload(filePath)
      .then(async (result) => {
        // create a file collection on FileModel
        let fileCreate = await FileModel.create(result);
        // fileCreate.version = undefined;
        // fileCreate.signature = undefined;
        // fileCreate.created_at = undefined;
        // fileCreate.secure_url = undefined;
        res.redirect('/');
      }).catch((error) => {
        res.status(500).send({
          message: "failure",
          error,
        });
      });
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