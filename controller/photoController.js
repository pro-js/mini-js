let catchAsync = require('../util/catchAsync');

exports.photoUpload = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'ok'
  });
});
