const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const photoRouter = require('./router/fileRouter');
const miniRouter = require('./router/miniRouter');
const sorturlModel = require('./model/sorturlModel');

// body parser configuration
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
 
app.use((req, res, next) => {
  // website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // request methods yo wish to allow 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // request HEADERS yo wish to allow 
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
  // request HEADERS yo wish to allow 
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Router
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.use('/mini', miniRouter)
app.use('/api/photo', photoRouter);

/*** Special Route ***/
app.get('/:shortUrl', async (req, res) => {
  let query = req.params.shortUrl;
  const urlData = 
    await sorturlModel.findOne({ shorturl: query });
  if (urlData == null) {
    res.render('error');
  }
  let newCnt = urlData.clicks + 1;
  await sorturlModel.updateOne(
    {shorturl : query}, 
    {$set : {clicks : newCnt}}
  );
  res.redirect(urlData.fullurl);
});

module.exports = app;