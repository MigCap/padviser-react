import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RentalCreateForm from './RentalCreateForm';

import * as rentalsActions from '../../../app/actions/rentals-action';

class RentalCreate extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    };

    this.rentalCategories = ['Audio', 'Video', 'Lighting'];
    this.rentalCondition = ['Good', 'Poor', 'Near Mint', 'Mint'];
  }

  createRental = rentalData => {
    rentalsActions.createRental(rentalData).then(
      rental => {
        this.setState({ redirect: true });
      },
      errors => {
        this.setState({ errors });
      }
    );
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/rentals' }} />;
    }
    return (
      <div className="container pt-5">
        <section id="newRental" className="mb-5">
          <div className="bwm-form">
            <div className="row">
              <div className="col-md-7">
                <h1>Add item to Inventory</h1>
                <RentalCreateForm
                  rentalCreateCb={this.createRental}
                  categoryOptions={this.rentalCategories}
                  conditionOptions={this.rentalCondition}
                  errors={this.state.errors}
                />
              </div>
              <div className="col-md-5 ml-auto">
                <div className="image-container">
                  <h2 className="catchphrase">
                    Book or Rent any AV equipement just with a few clicks.
                  </h2>
                  <img
                    src={process.env.PUBLIC_URL + '/img/login-image.jpeg'}
                    alt="NewRentalImage"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default RentalCreate;
