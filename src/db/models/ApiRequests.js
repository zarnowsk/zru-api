const mongoose = require('mongoose');

const apiRequestsSchema = mongoose.Schema({
  request_id: String,
  request_date: Date,
  status: Number,
  order_id: String,
  error: String,
});

module.exports = mongoose.model('ApiRequest', apiRequestsSchema);
