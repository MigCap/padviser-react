import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalDetailInfo from './RentalDetailInfo';
import RentalMap from './RentalMap';
import Booking from '../../booking/Booking';

import * as actions from '../../../app/actions';

const mapStateToProps = state => {
  return {
    rental: state.rental.data
  };
};

const imageStyled = {
  objectFit: 'contain',
  height: '360px'
};

class RentalDetail extends Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    const rental = this.props.rental;

    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt={rental.type} style={imageStyled} />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city}, ${rental.street}`} />
              </div>
            </div>
          </div>
          <div className="details-section mt-5 mb-5">
            <div className="row">
              <div className="col-lg-8 px-lg-5">
                <RentalDetailInfo rental={rental} />
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                <Booking rental={rental} />
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <h1> Loading ... </h1>;
    }
  }
}

export default connect(mapStateToProps)(RentalDetail);
