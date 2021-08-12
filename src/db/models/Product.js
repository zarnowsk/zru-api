const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product_id: Number,
  product_name: String,
});

module.exports = mongoose.model('Product', productSchema);
