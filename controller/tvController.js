const catchAsync = require('../util/catchAsync');
const tvModel = require('./../model/tvModel');

exports.getIPTV = catchAsync(async (req, res, next) => {
  let query = req.query.category, data;
  data = await tvModel.find({ category: query });
  if (data.length === 0) {
    data = await tvModel.find();
  }
  res.setHeader('Content-type', 'application/json');
  res.status(200).json(data);
});