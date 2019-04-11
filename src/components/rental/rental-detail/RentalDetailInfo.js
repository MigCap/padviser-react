import React from 'react';
import { Link } from 'react-router-dom';
import RentalAssets from './RentalAssets';
import RentalDetailReview from './RentalDetailReview';
import { toUpperCase } from 'app/helpers';

export default function RentalDetailInfo(props) {
  function renderReviews(reviews, rental) {
    if (reviews.length === 0) {
      return <p>This equipment has not received a review yet.</p>;
    } else if (reviews.length > 0) {
      return reviews.map((review, index) => (
        <RentalDetailReview key={index} review={review} rental={rental} />
      ));
    }
  }

  function renderPrice() {
    return (
      <span>
        You have to be{' '}
        <Link to="/register" className="link-hover">
          registered
        </Link>{' '}
        or{' '}
        <Link to="/login" className="link-hover">
          login
        </Link>{' '}
        to see the price of the equipment.
      </span>
    );
  }

  const { rental, reviews, isAuth } = props;
  return (
    <div className="rental">
      <h2 className={`rental-type ${rental.category}`}>{rental.category}</h2>
      <h1 className="rental-title">
        {rental.type} - {rental.brand} {rental.model}
      </h1>
      <h2 className="rental-city">
        {toUpperCase(rental.city)}, {toUpperCase(rental.country)}
      </h2>
      <div className="rental-room-info">
        <span className="bold">
          <i className="fa fa-building" />
          {rental.units} units available at the moment
        </span>
      </div>
      <hr />
      <p className="rental-description">
        <span className="bold">Description:</span> {rental.description}
      </p>
      <p className="rental-description">
        <span className="bold">Condition:</span> {rental.condition}.
      </p>
      <p className="rental-description">
        <span className="bold">Daily Rate:</span> {isAuth ? `${rental.dailyRate} $.` : renderPrice()}
      </p>
      <hr />
      <RentalAssets />
      <hr />
      <div className="rental-reviews">
        <h3 className="review-title">Customer Reviews</h3>
        {renderReviews(reviews, isAuth, rental)}
      </div>
    </div>
  );
}
