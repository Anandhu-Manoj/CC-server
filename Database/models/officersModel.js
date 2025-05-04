const mongoose = require("mongoose");
const { array } = require("../../Middleware/multerMiddleWare");

const officersSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  fathersname: {
    type: String,
  },
  batchNo: {
    type: Number,
  },
  number: {
    type: Number,
  },
  designation: {
    type: String,
  },
  circleofduty: {
    type: String,
  },
  serviceperiod: {
    type: Number,
  },
  Notification:{
    type:Array,
    
  }
});
const officers=mongoose.model('officers',officersSchema)
module.exports=officers