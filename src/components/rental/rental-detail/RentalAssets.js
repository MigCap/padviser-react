import React from 'react';

export default function RentalAssets() {
  return (
    <div className="rental-assets">
      <h3 className="title">Extras</h3>
      <div className="row">
        <div className="col-md-6">
          <span>
            <i className="fa fa-truck" /> Transport
          </span>
          <span>
            <i className="fa fa-location-arrow" /> Delivery / Pick Up
          </span>
        </div>
        <div className="col-md-6">
          <span>
            <i className="fa fa-comment" /> Rating & comments
          </span>
          <span>
            <i className="fa fa-wrench" /> Cabling & extras
          </span>
        </div>
      </div>
    </div>
  );
}
