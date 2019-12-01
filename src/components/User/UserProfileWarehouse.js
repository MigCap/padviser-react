import React from 'react'
import { Link } from 'react-router-dom';

export const UserProfileWarehouse = ({ rentals, bookings, numberPendingsPayments }) => {
  return (
    <ul className="list-group mt-lg-4">
      <li className="list-group-item list-group-item-secondary text-muted text-center small">
        <i className="fa fa-building mr-2" />
        My Warehouse
      </li>
      <Link
        className="list-group-item list-group-item-action text-right small"
        to="/rentals/manage"
      >
        <span className="pull-left">
          <strong>Items</strong>
        </span>{' '}
        {rentals && rentals.length}
      </Link>
      <Link
        className="list-group-item list-group-item-action text-right small"
        to="/bookings/manage"
      >
        <span className="pull-left">
          <strong>My Bookings</strong>
        </span>{' '}
        {bookings && bookings.length}
      </Link>
      <Link
        className="list-group-item list-group-item-action text-right small"
        to="/bookings/manage"
      >
        <span className="pull-left">
          <strong>Pending Bookings</strong>
        </span>{' '}
        {numberPendingsPayments}
      </Link>
    </ul>
  )
}
