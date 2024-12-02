const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  seats: {
    type: Number,
    required: true,
    min:0
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'User',
  },
},
{ timestamps: true }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
