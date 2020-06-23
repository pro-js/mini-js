let express = require('express');
let app = express();
let photoRouter = require('./router/photoRouter');

// Middleware 
app.use(express.json());

// Router
app.use('/api/photo', photoRouter);

module.exports = app;