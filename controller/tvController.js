const catchAsync = require('../util/catchAsync');
const tvModel = require('./../model/tvModel');

exports.getIPTV = catchAsync(async (req, res, next) => {
  let category = req.query.category, data;
  let country = req.query.country;

  if (category) data = tvModel.find({ category: category });
  else if (country) data = tvModel.find({ country: country });
  
  if (data === undefined || data === null || data.length === 0) 
    data = tvModel.find();
 
  res.setHeader('Content-type', 'application/json');  
  
  // Pageniation 
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 12;
  //console.log(page, limit);
  let skip = (page - 1) * limit;
  data = data.skip(skip).limit(limit);
  if (req.query.page) {
    let numChannels = await tvModel.countDocuments();
    if (skip >= numChannels) {
      res.status(200).json({
        "status": "Nothing here"
      });
    }
  }
  data = await data;
  res.status(200).json(data);
});