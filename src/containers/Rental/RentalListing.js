import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalList from 'components/rental/rental-listing/RentalList';

import * as actions from 'app/actions/rentals-action';

import './RentalListing.scss';

class RentalListing extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    const { fetchingRentals, data: rentals } = this.props.rentals;
    return (
      <div className="container pt-4 pt-md-5 pb-5">
        <section id="rentalListing">
          <h1>Your Gear All Around the Globe</h1>
          {!fetchingRentals && rentals ? (
            <RentalList rentals={rentals} />
          ) : (
            <div className="container pt-5">
              <div className="img-loading-overlay">
                <div className="img-spinning-circle" />
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals
  };
};

export default connect(mapStateToProps)(RentalListing);
