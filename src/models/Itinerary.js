const mongoose = require('mongoose');

const itineraryActivitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    }
});

const budgetBreakdownSchema = new mongoose.Schema({
    accommodation: {
        type: Number,
        required: true
    },
    foodDining: {
        type: Number,
        required: true
    },
    transportation: {
        type: Number,
        required: true
    },
    activities: {
        type: Number,
        required: true
    },
    other: {
        type: Number,
        required: true
    }
});

const itinerarySchema = new mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    travelStyle: {
        type: String,
        enum: ['Relaxed', 'Balanced', 'Active'],
        required: true
    },
    totalBudget: {
        type: Number,
        required: true
    },
    budgetBreakdown: {
        type: budgetBreakdownSchema,
        required: true
    },
    interests: [{
        type: String
    }],
    itineraryName: {
        type: String,
        required: true
    },
    itineraryActivities: [itineraryActivitySchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Ensure indexes are created
itinerarySchema.index({ userId: 1 });
itinerarySchema.index({ destination: 1 });

module.exports = mongoose.model('Itinerary', itinerarySchema); 