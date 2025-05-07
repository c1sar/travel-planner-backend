const Itinerary = require('../models/Itinerary');
const User = require('../models/User');

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user.id })
            .populate('destination')
            .populate({
                path: 'userId',
                select: 'firstname lastname email'
            })
            .populate('itineraryActivities.activity');
        
        res.status(200).json({
            success: true,
            count: itineraries.length,
            data: itineraries
        });
    } catch (error) {
        console.error('Error in getAllItineraries:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single itinerary by ID
exports.getItineraryById = async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user.id
        })
            .populate('destination')
            .populate({
                path: 'userId',
                select: 'firstname lastname email'
            })
            .populate('itineraryActivities.activity');

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                error: 'Itinerary not found'
            });
        }

        res.status(200).json({
            success: true,
            data: itinerary
        });
    } catch (error) {
        console.error('Error in getItineraryById:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new itinerary
exports.createItinerary = async (req, res) => {
    try {
        // Verify user exists
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Add userId from session to the request body
        const itineraryData = {
            ...req.body,
            userId: req.user.id
        };

        const itinerary = await Itinerary.create(itineraryData);
        
        const populatedItinerary = await Itinerary.findById(itinerary._id)
            .populate('destination')
            .populate({
                path: 'userId',
                select: 'firstname lastname email'
            })
            .populate('itineraryActivities.activity');

        res.status(201).json({
            success: true,
            data: populatedItinerary
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        console.error('Error in createItinerary:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update itinerary
exports.updateItinerary = async (req, res) => {
    try {
        // First find the itinerary to ensure it belongs to the user
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                error: 'Itinerary not found'
            });
        }

        // Update the itinerary
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('destination')
         .populate({
             path: 'userId',
             select: 'firstname lastname email'
         })
         .populate('itineraryActivities.activity');

        res.status(200).json({
            success: true,
            data: updatedItinerary
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        console.error('Error in updateItinerary:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}; 