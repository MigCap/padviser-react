import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toUpperCase, pretifyDate } from '../../../app/helpers';

export default function BookingCard(props) {
  const { booking } = props;

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
          <p className="card-text booking-days">
            {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} |{' '}
            {booking.days} days
          </p>
          <p className="card-text booking-price">
            <span>Price: </span>{' '}
            <span className="booking-price-value">{booking.totalPrice} $</span>
          </p>
          {booking.rental && (
            <Link className="btn btn-pa" to={`/rentals/${booking.rental._id}`}>
              Go to Rental
            </Link>
          )}
        </div>
        <div className="card-footer text-muted">
          Created at {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  );
}
