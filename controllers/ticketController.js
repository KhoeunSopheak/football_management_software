const mongoose = require('mongoose');
const Ticket = require('../model/ticketModel');
const Match = require('../model/matchModel');


exports.createTicket = async (req, res) => {
  try {
    const { price } = req.body;
    const { match_id } = req.params;
    const created_by = req.user?._id; 
    if (!match_id || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const match = await Match.findById(match_id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    const ticket = await Ticket.create({
      match_id,
      price,
      created_by,
    });

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(); 
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getTicketById = async (req, res) => {
  const ticketId  = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    return res.status(400).json({ success: false, message: 'Invalid Ticket ID' });
  }
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { seatNumber, price, status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { seatNumber, price, status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    await Ticket.findByIdAndDelete(ticketId);

    res.status(200).json({
      message: 'Ticket deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



