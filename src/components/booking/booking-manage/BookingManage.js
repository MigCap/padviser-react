import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookingCard from './BookingCard';

import * as actions from '../../../app/actions';

class BookingManage extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());
  }

  renderBookingsCards(bookings) {
    return bookings.map((booking, index) => (
      <BookingCard booking={booking} key={index} />
    ));
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;

    return (
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
    );
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  };
}

export default connect(mapStateToProps)(BookingManage);
