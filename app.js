let express = require("express");
let app = express();
let bodyParser = require('body-parser')
let photoRouter = require('./router/fileRouter');

// body parser configuration
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Router
app.get('/', (req, res) => {
  res.render('index');
})
app.use('/api/photo', photoRouter);

module.exports = app;