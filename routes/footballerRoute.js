const express = require('express');
const { createFootballer,
        getAllFootballer,
        getFootballerId, 
        updateFootballer,
        deleteFootballer
       } = require('../controllers/footballerController');
const verifyToken = require('../middleware/authMiddleware')

const footballerroute = express.Router();

footballerroute.post('/footballer', verifyToken('admin'), createFootballer);
footballerroute.get('/footballers', verifyToken('user', 'admin'), getAllFootballer);
footballerroute.get('/footballers/:id', verifyToken('user', 'admin'), getFootballerId);
footballerroute.put('/footballers/:id', verifyToken('admin'), updateFootballer);
footballerroute.delete('/footballers/:id', verifyToken('admin'), deleteFootballer);

module.exports = footballerroute;