const Destination = require('../models/Destination');

// Get all destinations
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new destination
exports.createDestination = async (req, res) => {
    try {
        const destination = await Destination.create(req.body);
        res.status(201).json({
            success: true,
            data: destination
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}; 