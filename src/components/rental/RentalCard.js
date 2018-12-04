import React from 'react';

const RentalCard = () => {
  return (
    <div className="col-md-3 col-xs-6">
      <div className="card bwm-card">
        <img
          className="card-img-top"
          src="http://via.placeholder.com/350x250"
          alt="ShureMics"
        />
        <div className="card-block">
          <h6 className="card-subtitle">D&B T10's &#183; New York</h6>
          <h4 className="card-title">12 items PA Package</h4>
          <p className="card-text">$240 per Day &#183; Free Cancelation</p>
          <a href="" className="card-link">
            More Info
          </a>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
