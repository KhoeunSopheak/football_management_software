const express = require('express');
const {
  bookTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');
const verifyToken = require("../middleware/authMiddleware");

const ticketRouter = express.Router();

ticketRouter.post('/booking',verifyToken ('user', 'admin'), bookTicket);
ticketRouter.get('/tickets',verifyToken ('user', 'admin'), getAllTickets);
ticketRouter.get('/tickets/:id',verifyToken ('user','admin'), getTicketById);
ticketRouter.put('/tickets/:id',verifyToken ('admin'), updateTicket);
ticketRouter.delete('/tickets/:id', verifyToken('admin'), deleteTicket);

module.exports = ticketRouter;
