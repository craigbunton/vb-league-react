const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  playerName: {
    type: String,
    required: true,
    unique: true
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

  active: {
    type: Boolean,
    required: false
  },
  leagues: []
});

module.exports = mongoose.model("player", PlayerSchema);
