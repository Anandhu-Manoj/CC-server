const mongoose = require("mongoose");

const policeSchema = new mongoose.Schema({
  serviceType: {
    type: String,
  },

  name: {
    type: String,
  },

  Date: {
    type: String,
  },

  number: {
    type: String,
  },

  details: {
    type: String,
  },
  userId:{
    type:String
  }
});

const pService = mongoose.model("pService", policeSchema);
module.exports = pService;
