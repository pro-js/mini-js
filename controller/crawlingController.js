const catchAsync = require('../util/catchAsync');
const request = require('request');
const cherio = require('cherio');

exports.getImg = catchAsync(async (req, res, next) => {
  let data = [], baseURL = req.query.baseURL;
   request(baseURL, (err, response, html) => {
      if (!err && response.statusCode === 200) {
       const $ = cherio.load(html);
       $("img").each((index, image) => {
         let imgURL = $(image).attr("src");
         data.push(imgURL);
       })
     } 
     res.status(200).json({"data": data});
   });
});