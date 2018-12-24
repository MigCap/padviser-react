import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import { pretifyDate } from '../../../app/helpers';

class RentalManageModal extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  openModal = () => {
    this.setState({
      open: true
    });
  };
  closeModal = () => {
    this.setState({
      open: false
    });
  };

  renderBookings(bookings) {
    return bookings.map((booking, index) => (
      <Fragment key={index}>
        <p>
          <span>Date:</span> {pretifyDate(booking.startAt)} -{' '}
          {pretifyDate(booking.endAt)}
        </p>
        <p>
          <span>Units:</span> {booking.units}
        </p>
        <p>
          <span>Total Price:</span> {booking.totalPrice} $
        </p>
        {index + 1 !== bookings.length && <hr />}
      </Fragment>
    ));
  }

  render() {
    const { bookings } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          onClick={this.openModal}
          className="badge badge-pill btn-pa-rental">
          Bookings
        </button>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          little
          classNames={{ modal: 'rental-booking-modal' }}>
          <h4 className="modal-title title">Made Bookings</h4>
          <div className="modal-body bookings-inner-container">
            {this.renderBookings(bookings)}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={this.closeModal}
              className="btn btn-pa">
              Cancel
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default RentalManageModal;
