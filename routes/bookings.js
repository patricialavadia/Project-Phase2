const { index, show, edit, bookRooms, update, delete: _delete } = require('../controllers/BookingsController');
function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}
module.exports = router => {
  router.get('/bookings', auth, index);
  router.post('/bookings/update', auth, update);
  router.post('/bookings/delete', auth, _delete);
  router.get('/bookings/:id/edit', auth, edit);
  router.get('/bookings/:id', auth, show);
};