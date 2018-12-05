import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';

import * as actions from '../../../app/actions';

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

class RentalListing extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Gear All Around the World</h1>
        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

export default connect(mapStateToProps)(RentalListing);
