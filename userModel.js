// Assuming this code resides in ./models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  facialEncoding: {
    type: Array, // Assuming facialEncoding is an array of numbers
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
