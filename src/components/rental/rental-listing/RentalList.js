import React, { Component } from 'react';
import RentalCard from './RentalCard';
class RentalList extends Component {
  renderRentals() {
    return this.props.rentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }
  render() {
    return <div className="row">{this.renderRentals()}</div>;
  }
}
export default RentalList;
