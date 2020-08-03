const express = require('express');
const router = express.Router();
const { 
  fileUpload, 
  getAllFiles, 
  destroyFiles 
} = require('../controller/fileController');

router.route('/upload').post(fileUpload);
router.route('/').get(getAllFiles);
router.route('/delete').post(destroyFiles);

module.exports = router;