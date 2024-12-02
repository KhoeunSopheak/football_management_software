const Booking = require("../model/bookingModel");
const Ticket = require("../model/ticketModel");
const Match = require("../model/matchModel")

exports.bookTicket = async (req, res) => {
    try {
      const { ticket_id } = req.params;
      const  user_id  = req.user?._id; 
      
      const bookingTicket = await Booking.create({
        user_id,
        ticket_id,
        status: 'booked',
      });

      const tickets = bookingTicket.ticket_id;

      const ticket = await Ticket.findById(tickets);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      const findmatch = ticket.match_id;
      const match = await Match.findById(match_id);
      if (!findmatch) {
      return res.status(404).json({ error: 'Match not found' });
    }
    if (match.seats <= 0) {
      return res.status(400).json({ error: 'No seats available for this match' });
    }

      const updatedMatch = await Match.findByIdAndUpdate(
        findmatch,
        {$inc: {seats:match.seats - 1}},
        {new: true}   
    );
      res.status(201).json({
        message: 'Ticket booked successfully',
        ticket: bookingTicket,
        updatedMatch
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.cancelBooking = async (req, res) => {
    try {
      const  booking_id  = req.params.id;
      const ticket = await Booking.findById(booking_id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      if (ticket.status === 'canceled') {
        return res.status(400).json({ message: 'Ticket is already canceled' });
      }
      ticket.status = 'canceled';
      await ticket.save();
  
      res.status(200).json({
        message: 'Booking canceled successfully',
        ticket,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



// exports.countTicketsPerMatch = async (req, res) => {
//     try {
//       const { ticket_id } = req.params;
//       if (!mongoose.Types.ObjectId.isValid(ticket_id)) {
//         return res.status(400).json({ error: 'Invalid Match ID' });
//       }
//       const match = await ticket.findById(matchId);
//       if (!match) {
//         return res.status(404).json({ error: 'Match not found' });
//       }
//       const ticketCount = await Ticket.countDocuments({ matchId, status: 'booked' });
//       res.status(200).json({
//         success: true,
//         matchId,
//         TotalTickets: ticketCount,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
  
//   exports.countCanceledBookings = async (req, res) => {
//     try {
//       const { matchId } = req.params;
//       if (!mongoose.Types.ObjectId.isValid(matchId)) {
//         return res.status(400).json({ error: 'Invalid Match ID' });
//       }
//       const match = await Match.findById(matchId);
//       if (!match) {
//         return res.status(404).json({ error: 'Match not found' });
//       }
//       const canceledBookingsCount = await Ticket.countDocuments({ matchId, status: 'canceled' });
  
//       res.status(200).json({
//         success: true,
//         TotalCancel:canceledBookingsCount,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };