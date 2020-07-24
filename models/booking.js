const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: String
  },
  classification: {
    type: String,
    required: true
  },
  roomNo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateFrom: {
    type: String,
    required: true
  },
  dateTo: {
    type: String,
    required: true
  },
  numberOfGuest: {
    type: Number,
    required: true
  },

  
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
});

  module.exports = mongoose.model('Booking', BookingSchema);