const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const RentalCtrl = require('../controllers/rental');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

router.get('/:id', RentalCtrl.findRentalById);

router.post('', UserCtrl.authMiddleware, RentalCtrl.createRental);

router.get('', RentalCtrl.searchCity);

module.exports = router;
