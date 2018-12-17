import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { ToastContainer, toast, Slide } from 'react-toastify';
import BookingModal from './BookingModal';
import { getRangeOfDates } from '../../app/helpers';
import * as moment from 'moment';
import * as actions from '../../app/actions/index';

export default class Booking extends React.Component {
  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        units: ''
      },
      modal: {
        open: false
      },
      errors: []
    };
  }
  componentWillMount() {
    this.getBookOutDates();
  }

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
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        units: parseInt(event.target.value)
      }
    });
  }

  cancelProposedBooking = () => {
    this.setState({
      modal: {
        open: false
      }
    });
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
    const { startAt, endAt } = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  }

  bookRental = () => {
    actions.createBooking(this.state.proposedBooking).then(
      booking => {
        this.addNewBookedOutDates(booking);
        this.cancelProposedBooking();
        this.resetFormData();
        toast.info('Booking has been succesfully created!', {
          hideProgressBar: true
        });
      },
      errors => {
        this.setState({ errors });
      }
    );
  };

  render() {
    const { rental } = this.props;
    const { startAt, endAt, units } = this.state.proposedBooking;
    return (
      <div className="booking">
        <ToastContainer transition={Slide} />
        <h3 className="booking-price">
          $ {rental.dailyRate}{' '}
          <span className="booking-per-night">per day</span>
        </h3>
        <hr />
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
              className="form-control"
            />
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="units">Units</label>
          <input
            onChange={event => {
              this.selectUnits(event);
            }}
            value={units}
            type="number"
            className="form-control"
            id="units"
            aria-describedby="units"
            placeholder=""
          />
        </div>
        <button
          disabled={!startAt || !endAt || !units}
          onClick={() => this.confirmProposedBooking()}
          className="btn btn-pa btn-confirm btn-block">
          Book equipment now
        </button>
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
        />
      </div>
    );
  }
}
