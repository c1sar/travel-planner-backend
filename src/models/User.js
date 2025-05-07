const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Profile
  firstname: String,
  lastname: String,
  phonenumber: String,
  bio: String,
  location: String,

  // Travel Preferences
  travelStyle: {
    type: String,
    enum: ['Relaxed', 'Balanced', 'Active'],
    default: 'Balanced'
  },
  preferredDestinations: {
    type: [String],
    enum: ['Beach', 'City', 'Island', 'Mountain', 'Countryside', 'Desert'],
    default: []
  },
  budgetPreference: {
    type: String,
    enum: ['Budget', 'Medium', 'Luxury'],
    default: 'Medium'
  },
  language: String,

  // Account
  email: { type: String, unique: true },
  password: String,

  // Notifications
  notifications: {
    push: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
