import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';

import * as actions from '../../../app/actions/rentals-action';

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

class ReantalListing extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <div className="container pt-5 pb-5">
        <section id="rentalListing">
          <h1>Your Gear All Around the Globe</h1>
          <RentalList rentals={this.props.rentals} />
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReantalListing);
