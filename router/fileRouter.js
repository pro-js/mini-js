let express = require('express');
let router = express.Router();
let { fileUpload, getAllFiles } = require('../controller/fileController');
let multerUploads = require('../fileSetting/multer');

router.route('/upload').post(multerUploads, fileUpload);
router.route('/').get(getAllFiles);

module.exports = router;