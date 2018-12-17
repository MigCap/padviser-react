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
    rentalPrice
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
        <p>Do you confirm your booking for selected days?</p>
      </div>
      <PaRespError errors={errors} />
      <div className="modal-footer">
        <button onClick={confirmModal} type="button" className="btn btn-pa">
          Confirm
        </button>
        <button type="button" onClick={closeModal} className="btn btn-pa">
          Cancel
        </button>
      </div>
    </Modal>
  );
}
