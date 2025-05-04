const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  circle: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  EndDate: {
    type: String,
    required: true,
  },
});

const leaves = mongoose.model("leaves", leaveSchema);
module.exports = leaves;
