import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingCard from './BookingCard';
import { PaymentCard } from './BookingCard';
import ReviewModal from '../../review/ReviewModal';

import * as actions from '../../../app/actions';

class BookingManage extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      pendingPayments: []
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayments();
  }

  reviewCreateCb = reviewData => {
    const ToastIcon = () => (
      <div>
        <div className="">
          <i className="fa fa-check pr-2" />
          Review has been succesfully posted!
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

  renderPaymentsCards(payments) {
    return payments.map((payment, index) => (
      <PaymentCard
        booking={payment.booking}
        payment={payment}
        paymentBtns={this.renderPaymentButtons}
        key={index}
      />
    ));
  }

  renderPaymentButtons = payment => {
    return (
      <div>
        <button
          className="btn btn-sm btn-success m-1"
          onClick={() => this.acceptPayment(payment)}>
          Accept
        </button>
        <button
          className="btn btn-sm btn-danger m-1"
          onClick={() => this.declinePayment(payment)}>
          Decline
        </button>
      </div>
    );
  };

  getPendingPayments() {
    actions
      .getPendingPayments()
      .then(pendingPayments => this.setState({ pendingPayments }))
      .catch(err => console.error(err));
  }

  acceptPayment(payment) {
    actions
      .acceptPayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  }

  declinePayment(payment) {
    actions
      .declinePayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    const { pendingPayments } = this.state;

    return (
      <Fragment>
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
        <div className="container pb-5">
          <section id="pendingBookings">
            <h1 className="page-title">Pending Bookings</h1>

            {pendingPayments && pendingPayments.length > 0 && (
              <div className="row">
                {this.renderPaymentsCards(pendingPayments)}
              </div>
            )}

            {!isFetching && pendingPayments.length === 0 && (
              <div className="alert alert-warning">
                You have no pending bookings.
              </div>
            )}
          </section>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  };
}

export default connect(mapStateToProps)(BookingManage);
