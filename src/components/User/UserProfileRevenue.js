import React from 'react'

export const UserProfileRevenue = ({ revenue }) => {
  return (
    <ul className="list-group mt-3">
      <li className="list-group-item list-group-item-secondary text-muted text-center small">
        <i className="fa fa-credit-card mr-2" />
        My Revenue
      </li>
      <li className="list-group-item text-right ">
        <span className="pull-left small">
          <strong>Dollars</strong>
        </span>{' '}
        {revenue / 100} $
      </li>
    </ul>
  )
}
