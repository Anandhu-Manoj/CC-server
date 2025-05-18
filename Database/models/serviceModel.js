const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
  fathersname: {
    type: String,
  },
  Date: {
    type: String,
  },
  number: {
    type: Number,
  },
  complaint: {
    type: String,
  },
  description: {
    type: String,
  },
  criminalname: {
    type: String,
  },
  relationship: {
    type: String,
  },
  visitingreason: {
    type: String,
  },
  visitingtime: {
    type: String,
  },
  serviceType: {
    type: String,
    required: true,
  },
});

const services = mongoose.model("services", serviceSchema);
module.exports = services;
