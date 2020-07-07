const mongoose = require('mongoose');

// 1- create Schema
const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
// mapping
module.exports = mongoose.model('Device', deviceSchema);
