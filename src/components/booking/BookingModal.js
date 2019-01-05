import React from 'react';
import Modal from 'react-responsive-modal';
import PaRespError from '../shared/form/PaRespError';

export default function BookingModal(props) {
  const {
    open,
    closeModal,
    booking,
    confirmModal,
    errors,
    rentalPrice,
    acceptPayment,
    disabled,
    settingBooking
  } = props;
  return (
    <Modal
      open={open}
      onClose={closeModal}
      little
      classNames={{ modal: 'booking-modal' }}>
      <h4 className="modal-title title">Confirm Booking </h4>
      <p className="dates">
        {booking.startAt} / {booking.endAt}
      </p>
      <div className="modal-body">
        <em>{booking.days}</em> days /<em>{`${rentalPrice} $`}</em> per Day
        <p>
          Units: <em>{booking.units}</em>
        </p>
        <p>
          Price: <em>{`${booking.totalPrice} $`}</em>
        </p>
        {acceptPayment && acceptPayment()}
        <p>Do you confirm your booking for selected days?</p>
      </div>
      {errors && errors.length > 0 && <PaRespError errors={errors} />}
      {settingBooking && !errors && (
        <div className="container pt-5">
          <div className="img-loading-overlay">
            <div className="img-spinning-circle" />
          </div>
        </div>
      )}
      <div className="modal-footer">
        <button
          disabled={disabled}
          onClick={confirmModal}
          type="button"
          className="btn btn-sm btn-pa">
          Confirm
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-sm btn-pa">
          Cancel
        </button>
      </div>
    </Modal>
  );
}
