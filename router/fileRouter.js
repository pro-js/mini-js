let express = require('express');
let router = express.Router();
let { 
  fileUpload, 
  getAllFiles, 
  destroyFiles 
} = require('../controller/fileController');

router.route('/upload').post(fileUpload);
router.route('/').get(getAllFiles);
router.route('/delete').post(destroyFiles);

module.exports = router;