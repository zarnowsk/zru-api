const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_id: String,
  first_name: String,
  last_name: String,
  phone_number: String,
});

module.exports = mongoose.model('User', userSchema);
