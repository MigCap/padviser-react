import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import RentalManageCard from './RentalManageCard';
import RentalManageCardH from './RentalManageCardH';
import RentalManageModal from './RentalManageModal';
import { ToastContainer, toast, Slide } from 'react-toastify';

import * as actions from '../../../app/actions';

class RentalManage extends Component {
  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };
  }

  componentWillMount() {
    this.setState({ isFetching: true });
    actions.getUserRentals().then(
      userRentals => {
        this.setState({ userRentals, isFetching: false });
      },
      errors => this.setState({ errors, isFetching: false })
    );
  }

  renderRentalCards = rentals =>
    rentals.map((rental, index) => (
      <RentalManageCardH
        rental={rental}
        key={index}
        rentalIndex={index}
        deleteRentalCb={this.deleteRental}
        modal={<RentalManageModal bookings={rental.bookings} key={index} />}
      />
    ));

  deleteRental = (rentalId, rentalIndex) => {
    actions.deleteRental(rentalId).then(
      () => {
        this.deleteRentalFromList(rentalIndex);
      },
      errors => {
        toast.error(errors[0].detail, { hideProgressBar: true });
      }
    );
  };

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.slice();

    userRentals.splice(rentalIndex, 1);

    this.setState({ userRentals });
  }

  render() {
    const { userRentals, isFetching } = this.state;
    return (
      <div className="container pt-5">
        <section id="userRentals">
          <ToastContainer transition={Slide} />
          <h1 className="page-title">My Inventory</h1>
          <div className="row mb-5">{this.renderRentalCards(userRentals)}</div>
          {!isFetching && userRentals.length === 0 && (
            <div className="alert alert-warning">
              You dont have any rentals currently created. Create rentals to
              advertise your equipment for free.
              <Link className="btn btn-pa ml-5" to="/rentals/new">
                Create Rental
              </Link>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default RentalManage;
