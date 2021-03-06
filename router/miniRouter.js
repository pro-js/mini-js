const express = require('express');
const router = express.Router();
const { getImg } = require('./../controller/crawlingController');
const { getIPTV } = require('./../controller/tvController');
const { 
  getBDCrimeData,
  getCrimeDataFromBDPolice 
} = require('./../controller/bdcrimeController');
const { 
  postURL, 
  getURLs 
} = require('./../controller/urlsortController');

const { getMinify } = require('./../controller/minifyJSController');

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
  .route('/urlshort')
  .get((req, res) => {
    res.render('urlshort');
  });

router.route('/urlshort/geturls').get(getURLs);
router.route('/urlshort/posturl').get(postURL);

/*** BD Crime visualization ***/
router
  .route('/bdcrime')
  .get((req, res) => {
    res.render('bdcrime');
  });

router.route('/api/bdcrime')
  .get(getBDCrimeData);

router.route('/special/bdcrime')
  .get(getCrimeDataFromBDPolice);

/*** JS minify ***/ 
router.route('/data')
  .post(getMinify);

module.exports = router;