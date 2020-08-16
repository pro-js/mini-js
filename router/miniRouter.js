const express = require('express');
const router = express.Router();
const { getImg } = require('./../controller/crawlingController');
/*** File Preview  ***/
router
  .route('/preview')
  .get((req, res) => {
    res.render('preview');
  });

/*** Web scrapping / crawling  ***/
router
  .route('/crawling-img')
  .get((req, res) => {
    res.render('crawling');
  });

router.route('/api/crawling-img/').get(getImg);

module.exports = router;