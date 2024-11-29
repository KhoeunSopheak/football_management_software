const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    matchId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Match', 
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'canceled', 'pending'],
      default: 'pending',
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
