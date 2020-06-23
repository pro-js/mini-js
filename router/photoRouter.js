let express = require('express');
let router = express.Router();
let { photoUpload } = require('./../controller/photoController');

router.route('/upload').post(photoUpload);

module.exports = router;