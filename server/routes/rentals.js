const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const RentalCtrl = require('../controllers/rental');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

router.get('/manage', UserCtrl.authMiddleware, RentalCtrl.manageRentals);

router.get('/:id/verify-user', UserCtrl.authMiddleware, RentalCtrl.verifyUser);

router.patch('/:id', UserCtrl.authMiddleware, RentalCtrl.editRental);

router.get('/:id', RentalCtrl.findRentalById);

router.delete('/:id', UserCtrl.authMiddleware, RentalCtrl.deleteRental);

router.post('', UserCtrl.authMiddleware, RentalCtrl.createRental);

router.get('', RentalCtrl.searchCity);

module.exports = router;
