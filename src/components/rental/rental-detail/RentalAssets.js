import React from 'react';

export default function RentalAssets() {
  return (
    <div className="rental-assets">
      <h3 className="title">Rental Extras</h3>
      <div className="row">
        <div className="col-md-4">
          <span>
            <i className="fa fa-truck" /> Transport
          </span>
        </div>
        <div className="col-md-4">
          <span>
            <i className="fa fa-location-arrow" /> Delivery / Pick Up
          </span>
        </div>
        <div className="col-md-4">
          <span>
            <i className="fa fa-wrench" /> Cabling
          </span>
        </div>
      </div>
    </div>
  );
}
