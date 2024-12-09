const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    minlength: 3,   // Ensure minimum length for username
    maxlength: 50,  // Optionally, limit username length
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6,   // Ensure minimum length for password
  }
}, { timestamps: true });  // Include timestamps

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
