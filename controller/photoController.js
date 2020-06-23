let catchAsync = require('../util/catchAsync');

exports.photoUpload = catchAsync(async (req, res, next) => {
  let data = req.body;
  res.status(200).json({
    status: 'ok',
    data: data
  });
});
