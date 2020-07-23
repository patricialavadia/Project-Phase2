const viewPath = ('rooms');
const Room = require('../models/room');
const Booking = require('../models/booking');
const User = require('../models/User');

exports.bookCustomers  = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    req.flash('success', 'Customer Booked successfully');
    res.redirect(`/rooms`);
  } catch (error) {
    req.flash('danger', `There was an error booking this customer: ${error}`);
    req.session.formData = req.body;
    res.redirect('/rooms/bookRooms');
  }
};
exports.index = async (req, res) => {
  try {
    const room = await Room
      .find()
      .populate('user')
      .sort({roomNo: 'asc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Rooms',
      room: room
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the Room: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    .populate('user')
    res.render(`${viewPath}/show`, {
      pageTitle: room.title,
      room: room
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this room: ${error}`);
    res.redirect('/');
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
    req.flash('success', 'Room added successfully');
    res.redirect(`/rooms/${room.id}`);
  } catch (error) {
    req.flash('danger', `There was an error adding this room: ${error}`);
    req.session.formData = req.body;
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
    if (!room) throw new Error('Blog could not be found');

    const attributes = {user: user._id, ...req.body};
    await Room.validate(attributes);
    await Room.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The Room was updated successfully');
    res.redirect(`/rooms/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this room: ${error}`);
    res.redirect(`/rooms/${req.body.id}/edit`);
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