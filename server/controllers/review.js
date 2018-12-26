const User = require('../models/user');
const Rental = require('../models/rental');

const Review = require('../models/review');
const Booking = require('../models/booking');
const moment = require('moment');

const { normalizeErrors } = require('../helpers/mongoose');

exports.getReviews = function(req, res) {
  const { rentalid } = req.query;

  Review.find({ rental: rentalid })
    .populate('user')
    .exec((err, reviews) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(reviews);
    });
};

exports.createReview = function(req, res) {
  const reviewData = req.body;
  const { bookingid } = req.query;
  const user = res.locals.user;

  Booking.findById(bookingid)
    .populate({ path: 'rental', populate: { path: 'user' } })
    .populate('review')
    .populate('user')
    .exec(async (err, foundBooking) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      const { rental } = foundBooking;

      if (rental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid user',
              detail: 'Cannot create reviews on your own equipment!'
            }
          ]
        });
      }

      const foundBookingUserId = foundBooking.user.id;

      if (foundBookingUserId !== user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid user',
              detail: 'Cannot write review on someone else booking!'
            }
          ]
        });
      }

      const timeNow = moment();
      const endAt = moment(foundBooking.endAt);

      if (!endAt.isBefore(timeNow)) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid date',
              detail: 'You can place review only after booking period finish!'
            }
          ]
        });
      }

      if (foundBooking.review) {
        return res.status(422).send({
          errors: [
            {
              title: 'Review Error',
              detail: 'Only one review per booking is allowed!'
            }
          ]
        });
      }

      const review = new Review(reviewData);
      review.user = user;
      review.rental = rental;
      foundBooking.review = review;

      try {
        await foundBooking.save();
        const savedReview = await review.save();

        return res.json(savedReview);
      } catch (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
    });
};
