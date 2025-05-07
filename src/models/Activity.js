const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    destinationId: {
        type: String,
        required: [true, 'Please add a destination id'],
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    type: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema); 