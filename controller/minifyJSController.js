const Terser = require('terser');
const catchAsync = require('../util/catchAsync');

exports.getMinify = catchAsync(async (req, res, next) => {
  const content = req.body.js;
  const options = {
    mangle: {
        toplevel: true,
    },
    nameCache: {}
  };

  res.setHeader('Content-type', 'application/json');
  try {
    const data = (await Terser.minify(content, options));
    res.status(200).json({ 
      data: data.code
    });
  } catch (error) {
    res.status(200).json({ 
      status: 'failed',
      message: "Invalid syntax"
    });
  }
});