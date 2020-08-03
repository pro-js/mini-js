const FileModel = require('./../model/fileModel');
const catchAsync = require('../util/catchAsync');
const cloudinarySetting = require('../config/cloudinarySetting');
const cloudinary = require('cloudinary');
const Formidable = require('formidable');

exports.fileUpload = catchAsync(async (req, res, next) => {
  const form = Formidable({ multiples: true });
  res.setHeader('Content-type', 'text/html');
  form.parse (req, (err, fields, files) => {
    if (err) return next(err);
    //if (files.upload.length === undefined || files.upload.length === 0) 
    //res.redirect('/error');
    let filePath = files.upload.path;
    cloudinarySetting.uploader.upload(filePath, {
      transformation: [
        {
          width: 500,
          height: 500,
          crop: "fill",
          gravity:"face"
        }
      ]
    })
    .then(async (result) => {
      let data = await FileModel.create(result);
      if (data) res.redirect('/');
    }).catch((error) => {
      res.redirect('/error');
    });
  });
});

exports.getAllFiles = catchAsync(async (req, res, next) => {
  let fileData = await FileModel.find();
  res.setHeader('Content-type', 'application/json');
  res.status(200).json({
    status: 'ok',
    lenght: fileData.length,
    fileData
  });
});

exports.destroyFiles = catchAsync(async (req, res, next) => {
  let publicID = req.body.public_id;
  res.setHeader('Content-type', 'application/json');
  cloudinary.v2.uploader.destroy(publicID, async function(error, result) {
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