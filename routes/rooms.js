const { new: _new, index, show, create, edit, bookRooms, bookCustomers, update, delete: _delete } = require('../controllers/RoomsController');
function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}
module.exports = router => {
  router.get('/rooms', auth, index);
  router.get('/rooms/new', auth, _new);
  router.post('/rooms', auth, create);
  router.get('/rooms/:id/bookRooms', auth, bookRooms);
  router.post('/rooms/bookCustomers', auth, bookCustomers);
  router.post('/rooms/update', auth, update);
  router.post('/rooms/delete', auth, _delete);
  router.get('/rooms/:id/edit', auth, edit);
  router.get('/rooms/:id', auth, show);
};