const mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: [true, 'please provide file public Id']
  },
  version: {
    type: Number,
    required: [true, 'please provide file version'],
    select: false
  },
  signature: {
    type: String,
    required: [true, 'please provide file signature'],
    select: false
  },
  width: {
    type: Number,
    required: [true, 'please provide file width']
  },
  height: {
    type: Number,
    required: [true, 'please provide file height']
  },
  format: {
    type: String,
    required: [true, 'please provide file format']
  },
  created_at: {
    type: String,
    required: [true, 'please provide file created_at time'],
    select: false
  },
  url: {
    type: String,
    required: [true, 'please provide file url']
  },
  secure_url: {
    type: String,
    required: [true, 'please provide file secure_url'],
    select: false
  }
});

let fileModel = mongoose.model('files', fileSchema);

module.exports = fileModel;