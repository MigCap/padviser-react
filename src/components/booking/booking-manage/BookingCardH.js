import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { toUpperCase, pretifyDate } from 'app/helpers';

import './BookingCardH.scss';

export default function BookingCardH (props) {
  function renderReviewButton(booking, modal) {
    let bookingFinished = moment().isAfter(booking.endAt);

    if (!booking.review && bookingFinished) {
      return modal;
    }

    return <Fragment />;
  }

  function renderBookingImage() {
    const image = props.booking.rental && props.booking.rental.image;
    if (image) {
      return <img src={image} alt="bookingImage" />;
    }
    return <i className="fa fa-ban fa-3x text-danger" />;
  }

  const { booking, modal } = props;

  if (booking && booking.rental) {
    return (
      <div className="col-12">
        <div className="booking-card-manage-container">
          <div className="avatar-container">{renderBookingImage()}</div>
  
          <div className="description-container">
            <Link
              to={`/rentals/${booking.rental._id}`}
              className="booking-card-link">
              <p className="booking-card-manage-title">
                {booking.rental.brand} - {booking.rental.model} (
                {`${toUpperCase(booking.rental.city)}, ${toUpperCase(
                  booking.rental.country
                )}`}
                )
                <span className={`booking-category ${booking.rental.category}`}>
                  {booking.rental ? booking.rental.category : 'Booking Deleted'}
                </span>
              </p>
              <p className="booking-card-manage-description">
                {booking.rental.description}
              </p>
              <p className="text-muted booking-card-manage-date">
                Created on {pretifyDate(booking.createdAt)}
              </p>
              <p className="text-muted booking-card-manage-date-booking">
                Booking from {pretifyDate(booking.startAt)} -{' '}
                {pretifyDate(booking.endAt)} | {booking.days} day/s
              </p>
            </Link>
          </div>
  
          <div className="booking-units">
            <span className="badge badge-pill badge-light">
              {booking.units} Unit/s
            </span>
            <span className="badge badge-pill badge-light">
              Price: {booking.totalPrice} $
            </span>
          </div>
  
          <div className="buttons-container-one">
            <Link
              to={`/rentals/${booking.rental._id}`}
              className="badge badge-pill btn-pa-booking">
              Go to Rental
            </Link>
            {renderReviewButton(booking, modal)}
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
}

export function PaymentCardH(props) {
  const { booking, payment, paymentBtns } = props;

  if (booking && booking.rental) {
    return (
      <div className="col-12">
        <div className="booking-card-manage-container">
          <div className="description-container">
            {booking.rental && (
              <Link
                to={`/rentals/${booking.rental._id}`}
                className="booking-card-link">
                <p className="booking-card-manage-title">
                  {booking.rental.brand} - {booking.rental.model} (
                  {`${toUpperCase(booking.rental.city)}, ${toUpperCase(
                    booking.rental.country
                  )}`}
                  )
                  <span className={`booking-category ${booking.rental.category}`}>
                    {booking.rental ? booking.rental.category : 'Booking Deleted'}
                  </span>
                  <span className="booking-made-by">
                    Booking Made By: {payment.fromUser.username}
                  </span>
                </p>
  
                <p className="booking-card-manage-description">
                  {booking.rental.description}
                </p>
                <p className="text-muted booking-card-manage-date">
                  Created on {pretifyDate(booking.createdAt)}
                </p>
                <p className="text-muted booking-card-manage-date-booking">
                  Booking from {pretifyDate(booking.startAt)} -{' '}
                  {pretifyDate(booking.endAt)} | {booking.days} day/s
                </p>
              </Link>
            )}
          </div>
  
          <div className="booking-units">
            <span className="badge badge-pill badge-light">
              {booking.units} Unit/s
            </span>
            <span className="badge badge-pill badge-light">
              Amount: {payment.amount / 100} $
            </span>
          </div>
  
          {booking.rental && (
            <div className="buttons-container-one">
              <span className="badge badge-pill badge-info">
                Status: {payment.status}
              </span>
            </div>
          )}
  
          <div className="buttons-container-two">
            {paymentBtns && payment.status === 'pending' && paymentBtns(payment)}
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
}
