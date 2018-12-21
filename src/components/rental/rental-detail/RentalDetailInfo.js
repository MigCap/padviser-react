import React from 'react';
import RentalAssets from './RentalAssets';
import RentalRating from './RentalRating';
import { toUpperCase } from 'app/helpers';

export default function RentalDetailInfo(props) {
  const rental = props.rental;
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
        <span className="bold">Daily Rate:</span> {rental.dailyRate} $.
      </p>
      <hr />
      <RentalAssets />
      <hr />
      <RentalRating rental={rental} />
    </div>
  );
}
