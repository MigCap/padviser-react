import React from 'react';

export default function RentalRating(props) {
  // const { rental } = props;
  return (
    <div className="rental-assets">
      <h3 className="review-title">Customer Reviews</h3>
      <div className="row">
        <div className="col-lg-10">
          <div className="review-card-container">
            <div className="avatar-container">
              <img
                src={process.env.PUBLIC_URL + '/img/user.png'}
                alt="owner"
                className="img-thumbnail"
              />
              <p>6 hours ago</p>
            </div>
            <p>
              Test User Random
              <br />
              <span>
                "Perfect conditions. Great equipment. Cabling was correct.
                Firmware was not up to date."
              </span>
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half" />
            </p>
          </div>

          <div className="review-card-container">
            <div className="avatar-container">
              <img
                src={process.env.PUBLIC_URL + '/img/user.png'}
                alt="owner"
                className="img-thumbnail"
              />
              <p>6 hours ago</p>
            </div>
            <p>
              Test User Random
              <br />
              <span>
                "Perfect conditions. Great equipment. Cabling was correct.
                Firmware was not up to date."
              </span>
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
