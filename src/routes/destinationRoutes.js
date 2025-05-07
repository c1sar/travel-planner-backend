const express = require('express');
const router = express.Router();
const { getAllDestinations, createDestination } = require('../controllers/destinationController');

router.route('/')
    .get(getAllDestinations)
    .post(createDestination);

module.exports = router; 