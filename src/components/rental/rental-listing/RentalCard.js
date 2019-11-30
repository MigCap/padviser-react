import React from 'react';
import { Link } from 'react-router-dom';

import './RentalCard.scss';


const RentalCard = props => {
  const rental = props.rental;
  return (
    <div className="col-md-3 col-xs-6 mb-3">
      <Link className="rental-detail-link" to={`/rentals/${rental._id}`}>
        <div className="card bwm-card">
          <img
            className="card-img-top rental-card-img"
            src={rental.image}
            alt={rental.model}
          />
          <div className="card-block">
            <h6 className={`card-subtitle ${rental.category}`}>
              {rental.brand} {rental.model} &#183; {rental.city}
            </h6>
            <h4 className="card-title">{rental.description}</h4>
            <p className="card-text">${rental.dailyRate} per Day</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;
