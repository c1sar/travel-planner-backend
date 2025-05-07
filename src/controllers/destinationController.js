const Destination = require('../models/Destination');
const Activity = require('../models/Activity');

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

// Get single destination by ID
exports.getDestinationById = async (req, res) => {
    try {
        console.log('Searching for destination with ID:', req.params.id);
        
        const destination = await Destination.findById(req.params.id);
        
        if (!destination) {
            console.log('Destination not found');
            return res.status(404).json({
                success: false,
                error: 'Destination not found'
            });
        }

        console.log('Found destination:', destination);

        // Get activities for this destination (always use string for destinationId)
        const activities = await Activity.find({ destinationId: req.params.id.toString() });
        console.log('Found activities:', activities);
        console.log('Number of activities found:', activities.length);

        // Create response object
        const response = {
            ...destination.toObject(),
            activities: activities
        };

        console.log('Final response:', response);

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Error in getDestinationById:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new activity
exports.createActivity = async (req, res) => {
    try {
        // Check if destination exists
        const destination = await Destination.findById(req.body.destinationId);
        if (!destination) {
            return res.status(404).json({
                success: false,
                error: 'Destination not found'
            });
        }

        const activity = await Activity.create(req.body);
        res.status(201).json({
            success: true,
            data: activity
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

// Test endpoint to get all activities
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        console.log('All activities in database:', activities);
        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });
    } catch (error) {
        console.error('Error in getAllActivities:', error);
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