import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';

import * as actions from '../../../app/actions';

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

class ReantalListing extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <div className="container pt-5">
        <section id="rentalListing">
          <h1 className="page-title">Your Gear All Around the Globe</h1>
          <RentalList rentals={this.props.rentals} />
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReantalListing);
