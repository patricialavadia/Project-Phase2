const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classification: {
    type: String,
    enum: ['DELUXED', 'SUITE','PRESIDENTIAL'],
    default: 'DELUXED'
  },
  roomNo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
});


// Query Helpers
  RoomSchema.query.deluxed = function () {
    return this.where({
      classification: 'DELUXED'
    })
  };
  
  RoomSchema.query.suit = function () {
    return this.where({
      classification: 'SUITE'
    })
  };
  RoomSchema.query.presidential = function () {
    return this.where({
      classification: 'PRESIDENTIALS'
    })
  };  
  RoomSchema.virtual('synopsis')
  .get(function () {
    const post = this.description;
    return post
      .replace(/(<([^>]+)>)/ig,"")
      .substring(0, 100);
  });
  
  module.exports = mongoose.model('Room', RoomSchema);