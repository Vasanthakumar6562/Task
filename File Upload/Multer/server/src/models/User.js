const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String], required: true },
  profileImage: { type: String } // stores image file path
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
