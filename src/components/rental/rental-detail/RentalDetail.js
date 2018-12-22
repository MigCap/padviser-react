import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalDetailInfo from './RentalDetailInfo';
import RentalDetailUpdate from './RentalDetailUpdate';
import RentalMap from './RentalMap';
import Booking from '../../booking/Booking';
import UserGuard from '../../shared/auth/UserGuard';

import * as actions from '../../../app/actions';

const imageStyled = {
  objectFit: 'contain',
  height: '360px'
};

class RentalDetail extends Component {
  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFeching: true
    };
  }

  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  componentDidMount() {
    const { isUpdate } = this.props.location.state || false;

    if (isUpdate) this.verifyRentalOwner();
  }

  verifyRentalOwner = () => {
    const rentalId = this.props.match.params.id;
    this.setState({ isFeching: true });

    return actions.verifyRentalOwner(rentalId).then(
      () => {
        this.setState({ isAllowed: true, isFeching: false });
      },
      () => {
        this.setState({ isAllowed: false, isFeching: false });
      }
    );
  };

  renderRentalDetail(rental, errors) {
    const { isUpdate } = this.props.location.state || false;
    const { isAllowed, isFeching } = this.state;

    return isUpdate ? (
      <UserGuard isAllowed={isAllowed} isFeching={isFeching}>
        <RentalDetailUpdate
          dispatch={this.props.dispatch}
          rental={rental}
          errors={errors}
          verifyUser={this.verifyRentalOwner}
        />
      </UserGuard>
    ) : (
      <RentalDetailInfo rental={rental} />
    );
  }

  render() {
    const { rental, errors } = this.props;

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
              <div className="col-lg-8 pr-lg-4">
                {this.renderRentalDetail(rental, errors)}
              </div>
              <div className="col-lg-4 mt-3 mt-lg-3">
                <Booking rental={rental} />
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.data,
    auth: state.auth,
    errors: state.rental.errors
  };
};

export default connect(mapStateToProps)(RentalDetail);
