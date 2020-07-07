const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// 1- create schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);
// mapping
module.exports = mongoose.model('User', userSchema);
