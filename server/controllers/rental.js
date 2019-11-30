const Rental = require('../models/rental');
const User = require('../models/user');

const { normalizeErrors } = require('../helpers/mongoose');

exports.findRentalById = function(req, res) {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'Item Error', detail: 'Could not find Item' }]
        });
      }
      return res.json(foundRental);
    });
};

exports.createRental = function(req, res) {
  const {
    brand,
    model,
    type,
    description,
    dailyRate,
    country,
    condition,
    city,
    street,
    category,
    image,
    units
  } = req.body;
  const user = res.locals.user;

  const rental = new Rental({
    brand,
    model,
    type,
    description,
    dailyRate,
    country,
    condition,
    city,
    street,
    category,
    image,
    units
  });
  rental.user = user;

  Rental.create(rental, function(err, newRental) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    User.updateMany(
      { _id: user.id },
      { $push: { rentals: newRental } },
      function() {}
    );

    return res.json(newRental);
  });
};

exports.deleteRental = function(req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date() } }
    })
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [{ title: 'Invalid User', detail: 'You are not item owner!' }]
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: 'Active Bookings',
              detail: 'Cannot delete item with active bookings!'
            }
          ]
        });
      }

      foundRental.remove(function(err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.json({ status: 'deleted' });
      });
    });
};

exports.editRental = function(req, res) {
  const rentalData = req.body;
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [
            { title: 'Invalid User', detail: 'You are not equipment owner!' }
          ]
        });
      }

      foundRental.set(rentalData);
      foundRental.save(function(err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.status(200).send(foundRental);
      });
    });
};

exports.verifyUser = function(req, res) {
  const user = res.locals.user;
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({
          errors: [
            { title: 'Invalid User', detail: 'You are not equipment owner!' }
          ]
        });
      }

      return res.json({ status: 'verified' });
    });
};

exports.manageRentals = function(req, res) {
  const user = res.locals.user;

  Rental.where({ user })
    .populate('bookings')
    .exec(function(err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(foundRentals);
    });
};

exports.searchCity = function(req, res) {
  const city = req.query.city;
  const findQuery = city && {
    $or: [
      { city: city.toLowerCase() },
      { description: { $regex: city.toLowerCase(), $options: 'i' } },
      { category: city.toLowerCase() },
    ]
  }
  const query = city ? findQuery : {};

  Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (city && foundRentals.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: 'No Items Found',
              detail: `There are no results for '${city}''`
            }
          ]
        });
      }
      return res.json(foundRentals);
    });
};
