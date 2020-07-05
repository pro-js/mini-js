let express = require('express');
let router = express.Router();
let { 
  fileUpload, 
  getAllFiles, 
  destroyFiles 
} = require('../controller/fileController');
let multerUploads = require('../config/multer');

router.route('/upload').post(multerUploads, fileUpload);
router.route('/').get(getAllFiles);
router.route('/delete').post(destroyFiles);

module.exports = router;