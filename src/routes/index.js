const express = require('express');
const router = express.Router();
const destinationRoutes = require('./destinationRoutes');
const itineraryRoutes = require('./itineraryRoutes');

// Mount routes
router.use('/destinations', destinationRoutes);
router.use('/itineraries', itineraryRoutes);

module.exports = router; 