import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { toUpperCase, pretifyDate } from 'app/helpers';

import './RentalManageCardH.scss';

class RentalManageCardH extends Component {
  constructor() {
    super();

    this.state = {
      wantDelete: false
    };
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    });
  }

  deleteRental(rentalId, rentalIndex) {
    this.setState({ wantDelete: false });

    this.props.deleteRentalCb(rentalId, rentalIndex);
  }

  render() {
    const { rental, modal, rentalIndex } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';

    return (
      <div className="col-12">
        <div className={`rental-card-manage-container ${deleteClass}`}>
          <div className="avatar-container">
            <img src={rental.image} alt="owner" className="" />
          </div>
          <div className="description-container">
            <Link to={`/rentals/${rental._id}`} className="rental-card-link">
              <p className="rental-card-manage-title">
                {rental.brand} - {rental.model} (
                {`${toUpperCase(rental.city)}, ${toUpperCase(rental.country)}`})
              </p>
              <p className="rental-card-manage-description">
                {rental.description}
              </p>
              <p className="text-muted rental-card-manage-date">
                Created on {pretifyDate(rental.createdAt)}
              </p>
            </Link>
          </div>
          <div className="rental-units">
            <span className="badge badge-pill badge-light">
              {rental.units} Units
            </span>
          </div>
          <div className="buttons-container-one">
            {rental.bookings && rental.bookings.length > 0 && modal}
          </div>
          <div className="buttons-container-two">
            {!wantDelete && (
              <Fragment>
                <button
                  onClick={() => {
                    this.showDeleteMenu();
                  }}
                  className="badge badge-pill badge-dark delete-btn-manage">
                  <i className="fa fa-trash" />
                </button>
                <Link
                  className="badge badge-pill badge-dark edit-btn-manage"
                  to={{
                    pathname: `/rentals/${rental._id}`,
                    state: { isUpdate: true }
                  }}>
                  <i className="fa fa-edit" />
                </Link>
              </Fragment>
            )}
            {wantDelete && (
              <Fragment>
                <div className="delete-menu">
                  <p>Do you confirm delete?</p>
                  <button
                    onClick={() => {
                      this.deleteRental(rental._id, rentalIndex);
                    }}
                    className="btn btn-danger btn-manage">
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      this.closeDeleteMenu();
                    }}
                    className="btn btn-success btn-manage">
                    No
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RentalManageCardH;
