import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast } from 'react-toastify';
import BookingModal from './BookingModal';
import { getRangeOfDates } from '../../app/helpers';
import Payment from '../payment/Payment';

import * as moment from 'moment';
import * as actions from '../../app/actions/index';

class Booking extends Component {
  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        units: '',
        paymentToken: undefined
      },
      modal: {
        open: false
      },
      errors: [],
      invalidUnits: false,
      paymentTokenExists: false,
      settingBooking: false
    };
  }

  componentDidMount() {
    this.getBookOutDates();
  }

  // componentWillUnmount() {
  //   console.log('booking unmounted');
  //   this.props.updateRentalAfterBooking();
  // }

  getBookOutDates() {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(
          booking.startAt,
          booking.endAt,
          'Y/MM/DD'
        );
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  checkInvalidDates = date => {
    return (
      this.bookedOutDates.includes(date.format('Y/MM/DD')) ||
      date.diff(moment(), 'days') < 0
    );
  };

  handleSelectedDates = (event, picker) => {
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');

    this.dateRef.current.value = startAt + ' to ' + endAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  };

  selectUnits(event) {
    this.setState({ invalidUnits: false });
    const rentalMaxUnits = this.props.rental.units;
    const proposedUnits = parseInt(event.target.value);
    if (proposedUnits > rentalMaxUnits) {
      this.setState({ invalidUnits: true });
    } else {
      this.setState({
        invalidUnits: false,
        proposedBooking: {
          ...this.state.proposedBooking,
          units: parseInt(event.target.value)
        }
      });
    }
  }

  cancelProposedBooking = () => {
    this.setState({
      modal: {
        open: false
      },
      errors: [],
      paymentTokenExists: false
    });
  };

  setPaymentToken = paymentToken => {
    const { proposedBooking } = this.state;

    proposedBooking.paymentToken = paymentToken;

    if (paymentToken !== undefined) {
      this.setState({ proposedBooking, paymentTokenExists: true });
    }
  };

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  resetFormData() {
    this.dateRef.current.value = '';

    this.setState({
      proposedBooking: { units: '' }
    });
  }

  confirmProposedBooking() {
    const { startAt, endAt, units } = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * (rental.dailyRate * units),
        rental
      },
      modal: {
        open: true
      }
    });
  }

  bookRental = () => {
    const ToastIcon = () => (
      <div>
        <div className="">
          <i className="fa fa-check pr-2" />
          Booking has been succesfully created!
        </div>
      </div>
    );
    console.log('call bookRental');
    this.setState({ settingBooking: true });
    actions.createBooking(this.state.proposedBooking).then(
      booking => {
        this.addNewBookedOutDates(booking);
        this.cancelProposedBooking();
        this.resetFormData();

        this.setState({
          invalidUnits: false,
          paymentTokenExists: false,
          settingBooking: false
        });

        toast(<ToastIcon />, {
          hideProgressBar: true,
          className: 'toast-success-background',
          bodyClassName: 'toast-success-body'
        });
      },
      errors => {
        this.setState({ errors, paymentTokenExists: false });
      }
    );
  };

  render() {
    const { rental, isAuth } = this.props;
    const { startAt, endAt, units, paymentToken } = this.state.proposedBooking;
    const { invalidUnits, paymentTokenExists } = this.state;
    return (
      <Fragment>
        <div className="booking">
          <h3 className="booking-price">
            $ {rental.dailyRate}{' '}
            <span className="booking-per-night">per day</span>
          </h3>
          <hr />
          {!isAuth && (
            <Link to="/login" className="btn btn-pa btn-confirm btn-block">
              {' '}
              Login to book equipment
            </Link>
          )}
          {isAuth && (
            <Fragment>
              <div className="form-group">
                <label htmlFor="dates">Dates</label>
                <DateRangePicker
                  onApply={this.handleSelectedDates}
                  isInvalidDate={this.checkInvalidDates}
                  opens="left"
                  containerStyles={{ display: 'block' }}>
                  <input
                    ref={this.dateRef}
                    id="dates"
                    type="text"
                    className="form-control form-control-sm"
                  />
                </DateRangePicker>
              </div>
              <div className="form-group">
                <label htmlFor="units">
                  Units (maximum available: {rental.units})
                </label>
                <input
                  onChange={event => {
                    this.selectUnits(event);
                  }}
                  value={units}
                  min="1"
                  max={rental.units}
                  type="number"
                  className="form-control form-control-sm"
                  id="units"
                  aria-describedby="units"
                  placeholder=""
                />
              </div>
              {invalidUnits && (
                <div className="alert alert-danger">
                  Max number of units: {rental.units}
                </div>
              )}
              <button
                disabled={!startAt || !endAt || !units || invalidUnits}
                onClick={() => this.confirmProposedBooking()}
                className="btn btn-pa btn-confirm btn-block">
                Book equipment now
              </button>
            </Fragment>
          )}
          <hr />
          <p className="booking-note-title">
            People are interested in this equipment
          </p>
          <p className="booking-note-text">
            More than 500 people checked this rental in last month.
          </p>
          <BookingModal
            booking={this.state.proposedBooking}
            open={this.state.modal.open}
            closeModal={this.cancelProposedBooking}
            confirmModal={this.bookRental}
            errors={this.state.errors}
            rentalPrice={rental.dailyRate}
            disabled={!paymentToken}
            settingBooking={this.state.settingBooking}
            acceptPayment={() => (
              <Payment
                setPaymentToken={this.setPaymentToken}
                paymentTokenExists={paymentTokenExists}
                errors={this.state.errors}
              />
            )}
          />
        </div>

        <div className="rental-owner">
          <img
            src={process.env.PUBLIC_URL + '/img/user.png'}
            alt="owner"
            className="img-thumbnail"
          />
          <p>
            {rental.user && rental.user.username}
            <br />
            <span>Rental Owner</span>
            {/*<br />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-half" />*/}
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Booking;
