import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RentalCreateForm from './RentalCreateForm';
import * as actions from '../../../app/actions';

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
    debugger;
    actions.createRental(rentalData).then(
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
      <section id="newRental" className="mb-5">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-6">
              <h1 className="page-title">Create Rental</h1>
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
                  Book or rent any AV equipement just with a few clicks.
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
    );
  }
}

export default RentalCreate;
