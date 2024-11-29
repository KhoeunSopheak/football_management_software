const Ticket = require('../model/ticketModel');
const Match = require('../model/Matches');

exports.bookTicket = async (req, res) => {
  try {
    const { matchId, seatNumber, price } = req.body;
    const { _id: userId } = req.user; 

    if (!matchId || !seatNumber || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const existingTicket = await Ticket.findOne({ matchId, seatNumber });
    if (existingTicket) {
      return res.status(409).json({ error: 'Seat is already booked for this match' });
    }

    const ticket = await Ticket.create({
      matchId,
      seatNumber,
      price,
      status: 'booked',
      created_by: userId,
    });
    const populatedTicket = await Ticket.findById(ticket._id).populate('created_by', 'username email');

    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket: populatedTicket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
  const id  = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Ticket ID' });
  }

  try {
    const ticket = await Ticket.findById(id);
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



