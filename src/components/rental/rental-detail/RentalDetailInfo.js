import React from 'react';
import RentalAssets from './RentalAssets';
import { toUpperCase } from 'app/helpers';

export default function RentalDetailInfo(props) {
  const rental = props.rental;
  return (
    <div className="rental">
      <h2 className={`rental-type ${rental.category}`}>{rental.category}</h2>
      <h1 className="rental-title">
        {rental.type} {rental.brand} {rental.model}
      </h1>
      <h2 className="rental-city">
        {toUpperCase(rental.city)}, {toUpperCase(rental.country)}
      </h2>
      <div className="rental-room-info">
        <span>
          <i className="fa fa-building" />
          {rental.units} units
        </span>
        {/*<span>
            <i className="fa fa-user" /> {rental.bedrooms + 4} guests
          </span>
          <span>
            <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
          </span>*/}
      </div>
      <hr />
      <p className="rental-description">Description: {rental.description}.</p>
      <p className="rental-description">Condition: {rental.condition}.</p>
      <p className="rental-description">Daily Rate: {rental.dailyRate}.</p>
      <hr />
      <RentalAssets />
    </div>
  );
}
