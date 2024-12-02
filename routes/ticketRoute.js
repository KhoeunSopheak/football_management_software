const express = require('express');
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');
const verifyToken = require("../middleware/authMiddleware");

const ticketRouter = express.Router();

ticketRouter.post('/add-tickets/:match_id',verifyToken ('admin'), createTicket);
ticketRouter.get('/tickets',verifyToken ('user', 'admin'), getAllTickets);
ticketRouter.get('/tickets/:id',verifyToken ('user','admin'), getTicketById);
ticketRouter.put('/tickets/:id',verifyToken ('admin'), updateTicket);
ticketRouter.delete('/tickets/:id', verifyToken('admin'), deleteTicket);

module.exports = ticketRouter;
