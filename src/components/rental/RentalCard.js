import React from 'react';
import { Link } from 'react-router-dom';

const RentalCard = props => {
  const rental = props.rental;
  return (
    <div className="col-md-3 col-xs-6 mb-4">
      <Link to={`/rentals/${rental.id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={rental.image} alt={rental.model} />
          <div className="card-block">
            <h4 className="card-title">{rental.description}</h4>
            <h6 className="card-subtitle">
              {rental.brand} {rental.model} &#183; {rental.city}
            </h6>
            <p className="card-text">
              ${rental.dailyRate} per Day &#183; Free Cancelation
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;
