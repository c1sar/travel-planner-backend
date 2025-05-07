const express = require('express');
const router = express.Router();
const { getAllDestinations, createDestination, getDestinationById } = require('../controllers/destinationController');

router.route('/')
    .get(getAllDestinations)
    .post(createDestination);

router.route('/:id')
    .get(getDestinationById);

module.exports = router; 