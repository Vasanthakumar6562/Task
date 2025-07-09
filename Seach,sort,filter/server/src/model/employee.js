const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  role: String,
  skills: String,
  address: String,
  profileImage: String, // file path
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
