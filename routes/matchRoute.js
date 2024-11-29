const express = require('express');
const {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} = require('../controllers/matchesControllers');
const verifyToken = require('../middleware/authMiddleware');

const matchRoute = express.Router();

matchRoute.post('/match', verifyToken('admin'), createMatch);
matchRoute.get('/matches', verifyToken('user', 'admin'), getMatches);
matchRoute.get('/matches/:id', verifyToken('user', 'admin'), getMatchById); 
matchRoute.put('/matches/:id', verifyToken('admin'), updateMatch); 
matchRoute.delete('/matches/:id', verifyToken('admin'), deleteMatch);

module.exports = matchRoute;
