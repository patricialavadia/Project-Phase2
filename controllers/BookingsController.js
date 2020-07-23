const viewPath = ('bookings');
const Booking = require('../models/booking');

exports.index = async (req, res) => {
  try {
    const booking = await Booking
      .find()
      .sort({updatedAt: 'asc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Bookings',
      booking: booking
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the Reservation: ${error}`);
    res.redirect('/');
  }
};
exports.show = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.render(`${viewPath}/show`, {
      pageTitle: booking.title,
      booking: booking
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this Reservation: ${error}`);
    res.redirect('/');
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
    let booking = await Booking.findById(req.body.id);
    if (!booking) throw new Error('Room could not be found');

    await Booking.validate(req.body);
    await Booking.updateOne(req.body);

    req.flash('success', 'The Room was updated successfully');
    res.redirect(`/bookings/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this room: ${error}`);
    res.redirect(`/bookings/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Booking.deleteOne({_id: req.body.id});
    req.flash('success', 'The room was deleted successfully');
    res.redirect(`/booking`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this room: ${error}`);
    res.redirect(`/bookings`);
  }
};