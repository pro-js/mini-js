let mongoose = require('mongoose');

let photoSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: [true, 'please provide image publicId']
  },
  version: {
    type: Number,
    required: [true, 'please provide image version'],
    select: false
  },
  signature: {
    type: String,
    required: [true, 'please provide image signature']
  },
  width: {
    type: Number,
    required: [true, 'please provide image width']
  },
  height: {
    type: Number,
    required: [true, 'please provide image height']
  },
  format: {
    type: String,
    required: [true, 'please provide image format']
  },
  createdAt: {
    type: String,
    required: [true, 'please provide image created_at time'],
    select: false
  },
  url: {
    type: String,
    required: [true, 'please provide image url']
  },
  secureUrl: {
    type: String,
    required: [true, 'please provide image secure_url'],
    select: false
  }
});

let photoModel = mongoose.model('Photos', photoSchema);

module.exports = photoModel;