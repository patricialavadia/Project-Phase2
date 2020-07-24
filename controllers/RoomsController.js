const viewPath = ('rooms');
const Room = require('../models/room');
const Booking = require('../models/booking');
const User = require('../models/User');

exports.bookCustomers  = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    
    const booking = await Booking.create({user: user._id, ...req.body});

    res.status(200).json(booking);
  } catch (error) {
    console.log("error: " + error)
    res.status(400).json({message: "There was an error creating the room post", error});
  }
};
exports.index = async (req, res) => {
  try {
    const rooms = await Room
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the Rooms', error});
  }
};

exports.show = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('user');
    
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({message: "There was an error fetching the blog"});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Room'
  });
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    
    const room = await Room.create({user: user._id, ...req.body});

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({message: "There was an error creating the room post", error});
  }
};

exports.edit = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: room.title,
      formData: room
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this room: ${error}`);
    res.redirect('/');
  }
};
exports.bookRooms = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.render(`${viewPath}/bookRooms`, {
      pageTitle: room.title,
      formData: room
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this room: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let room = await Room.findById(req.body.id);
    if (!room) throw new Error('Room not be found');

    const attributes = {user: user._id, ...req.body};
    await Room.validate(attributes);
    await Room.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The room was updated successfully');
    res.redirect(`/api/rooms/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this room: ${error}`);
    res.redirect(`/api/rooms/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Room.deleteOne({_id: req.body.id});
    req.flash('success', 'The room was deleted successfully');
    res.redirect(`/rooms`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this room: ${error}`);
    res.redirect(`/room`);
  }
};