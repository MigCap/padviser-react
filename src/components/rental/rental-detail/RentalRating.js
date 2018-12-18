import React from 'react';

export default function RentalRating() {
  return (
    <div className="rental-assets">
      <h3 className="title">Customer Reviews</h3>
      <div className="row">
        <div className="col-12">
          <span>
            <i className="fa fa-star" /> Rating
          </span>
          <span>
            <i className="fa fa-comment" /> Comments
          </span>
        </div>
      </div>
    </div>
  );
}
