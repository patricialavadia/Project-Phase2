const viewPath = ('bookings');
const Booking = require('../models/booking');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const booking = await Booking
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the Reservations', error});
  }
};
exports.show = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user');
    
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({message: "There was an error fetching the reservation details."});
  }
};
exports.edit = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: booking.title,
      formData: booking
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

    let booking = await Booking.findById(req.body.id);
    if (!booking) throw new Error('Reservation not found');

    const attributes = {user: user._id, ...req.body};
    await Booking.validate(attributes);
    await Booking.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The room was updated successfully');
    res.redirect(`/api/bookings/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this Reservation: ${error}`);
    res.redirect(`/api/bookings/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Booking.deleteOne({_id: req.body.id});
    req.flash('success', 'The room was deleted successfully');
    res.redirect(`/api/bookings`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this room: ${error}`);
    res.redirect(`/api/bookings`);
  }
};