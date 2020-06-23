let express = require('express');
let app = express();
let photoRouter = require('./router/photoRouter');

app.use('/api/photo', photoRouter);

module.exports = app;