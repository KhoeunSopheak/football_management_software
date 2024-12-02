const express = require('express');
const {
    bookTicket,
    cancelBooking,
    countTicketsPerMatch,
    countCanceledBookings,
} = require('../controllers/bookingController');
const verifyToken = require("../middleware/authMiddleware");

const bookingTicketRouter = express.Router();

bookingTicketRouter.post('/booking/:ticket_id',verifyToken ('user', 'admin'), bookTicket);
// bookingTicketRouter.get('/book-tickets/:match_id',verifyToken ('user', 'admin'), countTicketsPerMatch);
// bookingTicketRouter.get('/cancel-tickets/:match_id',verifyToken ('user', 'admin'), countCanceledBookings);
bookingTicketRouter.put('/cancel/:id', verifyToken('user','admin'), cancelBooking);

module.exports = bookingTicketRouter;
