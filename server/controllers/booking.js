const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const Payment = require('../models/payment');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

const config = require('../config');
const stripe = require('stripe')(config.STRIPE_SK);

const CUSTOMER_SHARE = 0.8;

exports.createBooking = function(req, res) {
  const {
    startAt,
    endAt,
    totalPrice,
    days,
    units,
    rental,
    paymentToken
  } = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startAt, endAt, totalPrice, days, units });

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(async function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid user',
              detail: 'Cannot create booking on your own equipment!'
            }
          ]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        const { payment, err } = await createPayment(
          booking,
          foundRental.user,
          paymentToken
        );

        if (payment) {
          booking.payment = payment;
          foundRental.bookings.push(booking);

          booking.save(function(err) {
            if (err) {
              return res
                .status(422)
                .send({ errors: normalizeErrors(err.errors) });
            }

            foundRental.save();
            User.updateMany(
              { _id: user.id },
              { $push: { bookings: booking } },
              function() {}
            );

            return res.json({
              startAt: booking.startAt,
              endAt: booking.endAt,
              units: booking.units
            });
          });
        } else {
          return res.status(422).send({
            errors: [
              {
                title: 'Invalid Payment!',
                detail: err
              }
            ]
          });
        }
      } else {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid Booking!',
              detail: 'Choosen dates already taken!'
            }
          ]
        });
      }
    });
};

exports.getUserBookings = function(req, res) {
  const user = res.locals.user;

  Booking.where({ user })
    .populate('rental')
    .exec(function(err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(foundBookings);
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;
  // WILL NEED TO CHECK IF (RENTAL UNITS NUMBER AVAILABLE >= RENTAL UNITS NUMBER PROPOSED)

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
}

async function createPayment(booking, toUser, token) {
  const { user } = booking;
  const tokenId = token.id || token;

  const customer = await stripe.customers.create({
    source: tokenId,
    email: user.email
  });

  if (customer) {
    User.updateMany(
      { _id: user.id },
      { $set: { stripeCustomerId: customer.id } },
      () => {}
    );

    // * 100 to give amount in cents * amount customer give to service-app
    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * CUSTOMER_SHARE
    });

    try {
      const savedPayment = await payment.save();
      return { payment: savedPayment };
    } catch (err) {
      return { err: err.message };
    }
  } else {
    return { err: 'Cannot process Payment!' };
  }
}
