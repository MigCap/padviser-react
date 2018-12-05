import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalCard from './RentalCard';

import * as actions from '../../app/actions';

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

class ReantalList extends Component {
  renderRentals() {
    return this.props.rentals.map(rental => {
      return <RentalCard key={rental.id} rental={rental} />;
    });
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Gear All Around the World</h1>
        <div className="row">{this.renderRentals()}</div>
      </section>
    );
  }
}

export default connect(mapStateToProps)(ReantalList);
