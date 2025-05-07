const express = require('express');
const router = express.Router();
const {
    getAllItineraries,
    getItineraryById,
    createItinerary,
    updateItinerary
} = require('../controllers/itineraryController');
const auth = require('../middleware/auth');

// Protect all routes
router.use(auth);

// GET /api/itineraries - Get all itineraries
router.get('/', getAllItineraries);

// GET /api/itineraries/:id - Get single itinerary
router.get('/:id', getItineraryById);

// POST /api/itineraries - Create new itinerary
router.post('/', createItinerary);

// PUT /api/itineraries/:id - Update itinerary
router.put('/:id', updateItinerary);

module.exports = router; 