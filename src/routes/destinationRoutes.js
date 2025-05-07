const express = require('express');
const router = express.Router();
const { getAllDestinations, createDestination, getDestinationById, getAllActivities, createActivity } = require('../controllers/destinationController');

router.route('/')
    .get(getAllDestinations)
    .post(createDestination);

router.route('/:id')
    .get(getDestinationById);

router.route('/activities/all')
    .get(getAllActivities);

router.route('/activities')
    .post(createActivity);

module.exports = router; 