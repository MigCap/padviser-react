import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import BookingCardH from "components/booking/booking-manage/BookingCardH";
import { PaymentCardH } from "components/booking/booking-manage/BookingCardH";
import ReviewModal from "components/review/ReviewModal";

import * as actions from "app/actions";

import "./BookingManage.scss";

// Test comment pre deploy
class BookingManage extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      pendingPayments: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayments();
  }

  reviewCreateCb = (reviewData) => {
    const ToastIcon = () => (
      <div>
        <div className="">
          <i className="fa fa-check pr-2" />
          Review has been succesfully posted!
        </div>
      </div>
    );

    actions.createReview(reviewData).then(
      (reviewed) => {
        toast(<ToastIcon />, {
          hideProgressBar: true,
          className: "toast-success-background",
          bodyClassName: "toast-success-body",
        });
        this.props.dispatch(actions.fetchUserBookings());
      },
      (errors) => {
        this.setState({ errors });
      }
    );
  };

  renderPaymentButtons = (payment) => {
    return (
      <div>
        <button
          className="btn badge badge-success m-1"
          onClick={() => this.acceptPayment(payment)}
        >
          Accept
        </button>
        <button
          className="btn badge badge-danger m-1"
          onClick={() => this.declinePayment(payment)}
        >
          Decline
        </button>
      </div>
    );
  };

  renderBookingsCards(bookings) {
    return (
      bookings &&
      bookings.map((booking, index) => (
        <BookingCardH
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
      ))
    );
  }

  renderPaymentsCards(pendingPayments) {
    const pendingPaymentsStatusPending =
      pendingPayments &&
      pendingPayments.filter(
        (pendingPayment) => pendingPayment.status === "pending"
      );
    const pendingPaymentsStatusPaid =
      pendingPayments &&
      pendingPayments.filter(
        (pendingPayment) => pendingPayment.status === "paid"
      );
    const pendingPaymentsStatusDeclined =
      pendingPayments &&
      pendingPayments.filter(
        (pendingPayment) => pendingPayment.status === "declined"
      );
    const newSetPendingPayments = [
      ...pendingPaymentsStatusPending,
      ...pendingPaymentsStatusPaid,
      ...pendingPaymentsStatusDeclined,
    ];

    return (
      newSetPendingPayments &&
      newSetPendingPayments.map((pendingPayment, index) => (
        <PaymentCardH
          booking={pendingPayment.booking}
          payment={pendingPayment}
          paymentBtns={this.renderPaymentButtons}
          key={index}
        />
      ))
    );
  }

  getPendingPayments() {
    actions
      .getPendingPayments()
      .then((pendingPayments) => this.setState({ pendingPayments }))
      .catch((err) => console.error(err));
  }

  acceptPayment(payment) {
    actions
      .acceptPayment(payment)
      .then((status) => {
        this.getPendingPayments();
      })
      .catch((err) => console.error(err));
  }

  declinePayment(payment) {
    actions
      .declinePayment(payment)
      .then((status) => {
        this.getPendingPayments();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    const { pendingPayments } = this.state;

    if (!isFetching && pendingPayments && !isFetching && bookings) {
      return (
        <Fragment>
          <div className="row container mx-auto mt-3">
            <ul className="nav nav-tabs nav-tabs-booking-manage">
              <li className="nav-item">
                <a
                  className="nav-link custom-tab-link active"
                  data-toggle="tab"
                  href="#myRentals"
                >
                  MY BOOKINGS
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link custom-tab-link"
                  data-toggle="tab"
                  href="#pendingRentals"
                >
                  PENDING BOOKINGS
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="myRentals">
                <section id="userBookings" className="my-4">
                  <h1 className="page-title">My Bookings</h1>
                  <p className="text-muted font-weight-light small">
                    Check booked products status. Leave reviews
                  </p>
                  <div className="row mb-5">
                    {this.renderBookingsCards(bookings)}
                  </div>
                  {!isFetching && bookings.length === 0 && (
                    <div className="alert alert-warning">
                      You have no bookings created yet. Go to rentals section
                      and book your equipment today.
                      <Link className="btn btn-pa ml-3" to="/rentals">
                        Available Rentals
                      </Link>
                    </div>
                  )}
                </section>
              </div>
              <div className="tab-pane" id="pendingRentals">
                <section id="pendingBookings" className="my-4">
                  <h1 className="page-title">Pending Bookings</h1>
                  <p className="text-muted font-weight-light small">
                    Check received bookings status. Accept or decline bookings
                  </p>
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
            </div>
          </div>
          {/* <div className="container pt-4 pt-md-5">
            <section id="userBookings">
              <h1 className="page-title">My Bookings</h1>
              <p className="text-muted font-weight-light small">Check booked products status. Leave reviews</p>

              <div className="row mb-5">
                {this.renderBookingsCards(bookings)}
              </div>
              {!isFetching && bookings.length === 0 && (
                <div className="alert alert-warning">
                  You have no bookings created yet. Go to rentals section and
                  book your equipment today.
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
              <p className="text-muted font-weight-light small">Check received bookings status. Accept or decline bookings</p>

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
          </div> */}
        </Fragment>
      );
    } else {
      return (
        <div className="container pt-5">
          <div className="img-loading-overlay">
            <div className="img-spinning-circle" />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings,
  };
}

export default connect(mapStateToProps)(BookingManage);
