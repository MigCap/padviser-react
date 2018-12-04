import React, { Component } from 'react';
import RentalCard from './RentalCard';

class ReantalList extends Component {
  constructor() {
    super();

    this.state = {
      rentals: [1, 2, 3, 4]
    };
  }

  renderRentals() {
    return this.state.rentals.map((rental, index) => {
      return <RentalCard key={index} />;
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

export default ReantalList;
