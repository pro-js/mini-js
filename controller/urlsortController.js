const catchAsync = require('../util/catchAsync');
const sorturlModel = require('./../model/sorturlModel');
const shortid = require('shortid');

exports.postURL = catchAsync(async (req, res, next) => {
  let token = req.query.token,
    fullurl = req.query.fullurl,
    shorturl = shortid.generate();
  
  let data = {
    fullurl: fullurl,
    shorturl: shorturl,
    token: token
  }
  data = await sorturlModel.create(data);   
  res.setHeader('Content-type', 'application/json');
  if (data) res.status(200).json({ "status": "ok" });
  else res.status(200).json({ "status": "failed" });
});

exports.getURLs = catchAsync(async (req, res, next) => {
  let token = req.query.token;
  let data = await sorturlModel.find({ token: token });
  res.setHeader('Content-type', 'application/json');
  res.status(200).json(data);
});