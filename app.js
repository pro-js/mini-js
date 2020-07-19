let express = require("express");
let app = express();
let photoRouter = require('./router/fileRouter');

// body parser configuration
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Router
app.get('/', (req, res) => {
  res.render('index');
})
app.use('/api/photo', photoRouter);

module.exports = app;