const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    typeOfDestination: {
        type: String,
        enum: ['Beach', 'City', 'Island', 'Mountain', 'Countryside', 'Desert'],
        required: true
    },
    tags: [{
        type: String
    }],
    travelStyle: {
        type: String,
        enum: ['Relaxed', 'Balanced', 'Active'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Destination', destinationSchema); 