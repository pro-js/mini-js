let express = require('express');
let router = express.Router();
let { photoUpload } = require('../controller/fileController');
let multerUploads = require('../fileSetting/multer');

router.route('/upload').post(multerUploads, photoUpload);

module.exports = router;