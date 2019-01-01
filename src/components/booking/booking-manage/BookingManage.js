import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingCard from './BookingCard';
import ReviewModal from '../../review/ReviewModal';

import * as actions from '../../../app/actions';

class BookingManage extends Component {
  constructor() {
    super();

    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
  }

  renderBookingsCards(bookings) {
    return bookings.map((booking, index) => (
      <BookingCard
        booking={booking}
        key={index}
        modal={
          <ReviewModal
            key={index}
            reviewCreateCb={this.reviewCreateCb}
            booking={booking}
            errors={this.state.errors}
          />
        }
      />
    ));
  }

  reviewCreateCb = reviewData => {
    const ToastIcon = () => (
      <div>
        <div className="">
          <i className="fa fa-check pr-2" />
          Booking has been succesfully created!
        </div>
      </div>
    );
    actions.createReview(reviewData).then(
      reviewed => {
        toast(<ToastIcon />, {
          hideProgressBar: true,
          className: 'toast-success-background',
          bodyClassName: 'toast-success-body'
        });
        this.props.dispatch(actions.fetchUserBookings());
      },
      errors => {
        this.setState({ errors });
      }
    );
  };

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;

    return (
      <div className="container pt-5">
        <section id="userBookings">
          <h1 className="page-title">My Bookings</h1>
          <div className="row mb-5">{this.renderBookingsCards(bookings)}</div>
          {!isFetching && bookings.length === 0 && (
            <div className="alert alert-warning">
              You have no bookings created yet. Go to rentals section and book
              your equipment today.
              <Link className="btn btn-pa ml-3" to="/rentals">
                Available Rentals
              </Link>
            </div>
          )}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  };
}

export default connect(mapStateToProps)(BookingManage);
