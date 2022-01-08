const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provde password"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
