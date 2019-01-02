import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { toUpperCase, pretifyDate } from '../../../app/helpers';
import moment from 'moment';

export default function BookingCard(props) {
  function renderReviewButtons(booking, modal) {
    let bookingFinished = moment().isAfter(booking.endAt);

    if (!booking.review && bookingFinished) {
      return modal;
    }

    return <div />;
  }

  const { booking, modal } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.rental ? booking.rental.category : 'Deleted Rental'}
        </div>
        <div className="card-block">
          {booking.rental && (
            <Fragment>
              <span className="card-title">
                {' '}
                <h4>
                  {booking.rental.brand} {booking.rental.model}
                </h4>
                <h4>
                  {`${toUpperCase(booking.rental.city)}, ${toUpperCase(
                    booking.rental.country
                  )}`}
                </h4>
              </span>
              <p className="card-text booking-desc">
                {booking.rental.description}
              </p>
            </Fragment>
          )}

          <p className="card-text booking-price">
            <span className="badge badge-pill badge-info ml-1">
              Price: {booking.totalPrice} $
            </span>
            <span className="badge badge-pill badge-info ml-1">
              Units: {booking.units}
            </span>
          </p>

          <p className="card-text booking-days">
            {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} |{' '}
            {booking.days} day/s
          </p>

          {booking.rental && (
            <Link
              className="btn btn-sm btn-pa mb-1"
              to={`/rentals/${booking.rental._id}`}>
              Go to Rental
            </Link>
          )}
          {renderReviewButtons(booking, modal)}
        </div>
        <div className="card-footer text-muted">
          Created at {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  );
}

export function PaymentCard(props) {
  const { booking, payment, paymentBtns } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          Booking Made By: {payment.fromUser.username}
        </div>
        <div className="card-block">
          {booking.rental && (
            <Fragment>
              <span className="card-title">
                {' '}
                <h4>
                  {booking.rental.brand} {booking.rental.model}
                </h4>
                <h4>
                  {`${toUpperCase(booking.rental.city)}, ${toUpperCase(
                    booking.rental.country
                  )}`}
                </h4>
              </span>
              <p className="card-text booking-desc">
                {booking.rental.description}
              </p>
            </Fragment>
          )}

          <p className="card-text booking-price">
            <span className="badge badge-pill badge-info ml-1">
              Amount: {payment.amount / 100} $
            </span>
            <span className="badge badge-pill badge-info ml-1">
              Units: {booking.units}
            </span>
          </p>

          <p className="card-text booking-days">
            {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} |{' '}
            {booking.days} day/s
          </p>

          <p className="card-text booking-desc">Status: {payment.status}</p>

          {booking.rental && (
            <Link
              className="btn btn-sm btn-pa mb-1"
              to={`/rentals/${booking.rental._id}`}>
              Go to Rental
            </Link>
          )}
        </div>
        <div className="card-footer text-muted">
          Created at {pretifyDate(booking.createdAt)}
          {paymentBtns && payment.status === 'pending' && paymentBtns(payment)}
        </div>
      </div>
    </div>
  );
}
