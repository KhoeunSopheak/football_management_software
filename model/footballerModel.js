const mongoose = require('mongoose');

const footballerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: null,
  },
  nationality: {
    type: String,
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: null,
    ref: 'User',
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'User',
  },
});

footballerSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Footballer = mongoose.model('Footballer', footballerSchema);
module.exports = Footballer;
