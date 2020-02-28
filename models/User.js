const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  },
  isManager: {
    type: Boolean,
    required: false,
    default: false
  },
  leagues: []
});

module.exports = mongoose.model("user", UserSchema);
