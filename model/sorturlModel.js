const mongoose = require('mongoose');

let sorturlSchema = new mongoose.Schema({
  fullurl: {
    type: String,
    required: [true, 'please provide valid url']
  },
  shorturl: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  token: {
    type: String,
    required: [true, 'please provide valid token']
  }
});

let sorturlModel = mongoose.model('urlsort', sorturlSchema);

module.exports = sorturlModel;