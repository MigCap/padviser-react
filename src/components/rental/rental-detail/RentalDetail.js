import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../app/actions';

const mapStateToProps = state => {
  return {
    rental: state.rental.data
  };
};
class RentalDetail extends Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    const rental = this.props.rental;

    if (rental.id) {
      return (
        <div>
          <h1>{rental.brand}</h1>
          <h1>{rental.model}</h1>
          <h1>{rental.units}</h1>
          <h1>{rental.condition}</h1>
        </div>
      );
    } else {
      return <h1> Loading ... </h1>;
    }
  }
}

export default connect(mapStateToProps)(RentalDetail);
