let express = require("express");
let app = express();
let photoRouter = require('./router/photoRouter');

// body parser configuration
app.use(express.json());

// Router
app.use('/api/photo', photoRouter);

module.exports = app;