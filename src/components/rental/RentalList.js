import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalCard from './RentalCard';

const mapStateToProps = state => {
  return {
    rentals: state.rentals
  };
};

class ReantalList extends Component {
  renderRentals() {
    return this.props.rentals.map(rental => {
      return <RentalCard key={rental.id} rental={rental} />;
    });
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
