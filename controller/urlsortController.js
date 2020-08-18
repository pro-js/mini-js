const catchAsync = require('../util/catchAsync');
const sorturlModel = require('./../model/sorturlModel');
const shortid = require('shortid');

exports.postURL = catchAsync(async (req, res, next) => {
  let token = req.query.token,
    fullurl = req.query.fullurl,
    shorturl = req.query.shortURL;

  if (shorturl === "morol") {
    shorturl = shortid.generate();
  }
  
  let data = {
    fullurl: fullurl,
    shorturl: shorturl,
    token: token
  }
  res.setHeader('Content-type', 'application/json');
  let oldData = await sorturlModel.findOne({ shorturl: shorturl });
  if (oldData) {
    res.status(200).json({ "status": "used" });
  } else {
    data = await sorturlModel.create(data);   
    if (data) res.status(200).json({ "status": "ok" });
    else res.status(200).json({ "status": "failed" });
  }
});

exports.getURLs = catchAsync(async (req, res, next) => {
  let token = req.query.token;
  let data = await sorturlModel.find({ token: token });
  res.setHeader('Content-type', 'application/json');
  res.status(200).json(data);
});