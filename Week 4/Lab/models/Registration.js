const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('Registration', registrationSchema);