const catchAsync = require('../util/catchAsync');
const tvModel = require('./../model/tvModel');

exports.getIPTV = catchAsync(async (req, res, next) => {
  let category = req.query.category, data;
  let country = req.query.country;

  if (category) data = await tvModel.find({ category: category });
  else if (country) data = await tvModel.find({ country: country });
  
  if (data === undefined || data === null || data.length === 0) 
    data = await tvModel.find();

  res.setHeader('Content-type', 'application/json');
  res.status(200).json(data);
});