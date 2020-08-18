const express = require('express');
const router = express.Router();
const { getImg } = require('./../controller/crawlingController');
const { getIPTV } = require('./../controller/tvController');
const { 
  postURL, 
  getURLs 
} = require('./../controller/urlsortController');


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

/*** Tv API ***/
router
  .route('/iptv')
  .get((req, res) => {
    res.render('iptv');
  });
router.route('/api/iptv').get(getIPTV);

/*** URL Sort ***/
router
  .route('/urlsort')
  .get((req, res) => {
    res.render('urlsort');
  });

router.route('/urlsort/geturls').get(getURLs);
router.route('/urlsort/posturl').get(postURL);

module.exports = router;