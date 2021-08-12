const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  order_id: String,
  product_id: Number,
  user_id: String,
});

module.exports = mongoose.model('Order', orderSchema);
