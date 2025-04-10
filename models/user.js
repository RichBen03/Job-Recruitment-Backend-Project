// models/user.js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ["jobseeker", "employer"],
    required: [true, "Please specify user role"]
  },
  skills: [String],
  industry: String,
  location: String
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

userSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);