const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  numid: Number,
  collectionName: String,
  allowed_params: Array,
  name: String,
  desc: String,
  sensorType: String,
  linkDoc: String,
  exampleQueryDateRange: String,
  exampleQueryTempRange: String,
  visible: String,
  realtime: String
}, { collection: 'sensores' });

module.exports = mongoose.model('Sensore', sensorSchema);