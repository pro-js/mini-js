const mongoose = require('mongoose');

let tvSchema = new mongoose.Schema({
  name: {
    type: String
  },
  logo: {
    type: String
  },
  url: {
    type: String
  },
  country: {
    type: String
  },
  category: {
    type: String
  }
});

let tvModel = mongoose.model('tvlist', tvSchema);

module.exports = tvModel;