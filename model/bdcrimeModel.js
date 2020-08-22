const mongoose = require('mongoose');

let bdcrimeSchema = new mongoose.Schema({
  CrimeYear: {
    type: String
  },
  Unit: {
    type: String
  },
  Dacoity: {
    type: Number
  },
  Robbery: {
    type: Number
  },
  Murder: {
    type: Number
  },
  SpeedyTrial: {
    type: Number
  },
  Riot: {
    type: Number
  },
  WomanChildRepression: {
    type: Number
  },
  Kidnapping: {
    type: Number
  },
  PoliceAssault: {
    type: Number
  },
  Burglary: {
    type: Number
  },
  Theft: {
    type: Number
  },
  OtherCases: {
    type: Number
  },
  RecoveryCases: {
    ArmsAct: {
      type: Number
    },
    Explosive: {
      type: Number
    },
    Narcotics: {
      type: Number
    },
    Smuggling: {
      type: Number
    },
    Total: {
      type: Number
    }
  },
  TotalCases: {
    type: Number
  }
});

let bdcrimeModel = mongoose.model('bdcrime', bdcrimeSchema);

module.exports = bdcrimeModel;