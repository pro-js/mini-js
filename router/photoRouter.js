let express = require('express');
let router = express.Router();
let { photoUpload } = require('./../controller/photoController');
let multerUploads = require('./../photoSetting/multer');

router.route('/upload').post(multerUploads, photoUpload);

module.exports = router;