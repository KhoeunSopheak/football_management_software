const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    match_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Match', 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
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
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
