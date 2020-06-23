let multer = require('multer');

let  multerUploads = multer({ dest: './temp'}).single('image');

module.exports = multerUploads;