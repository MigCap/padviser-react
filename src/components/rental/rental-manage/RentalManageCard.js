import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toUpperCase, pretifyDate } from '../../../app/helpers';

class RentalManageCard extends Component {
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
      <div className="col-lg-4">
        <div className={`card text-center ${deleteClass}`}>
          <div className="card-block">
            <h4 className="card-title">
              {rental.brand} - {rental.model}
            </h4>
            <p className="card-text">
              {`${toUpperCase(rental.city)}, ${toUpperCase(rental.country)}`}
            </p>
            <p className="card-text"> {rental.description} </p>
            <Link className="btn btn-pa" to={`/rentals/${rental._id}`}>
              Go to Rental
            </Link>
            {rental.bookings && rental.bookings.length > 0 && modal}
          </div>
          <div className="card-footer text-muted">
            Created on {pretifyDate(rental.createdAt)}
            {!wantDelete && (
              <Fragment>
                <button
                  onClick={() => {
                    this.showDeleteMenu();
                  }}
                  className="btn btn-info delete-btn">
                  Delete
                </button>
                <Link
                  className="btn btn-warning edit-btn"
                  to={{
                    pathname: `/rentals/${rental._id}`,
                    state: { isUpdate: true }
                  }}>
                  Edit
                </Link>
              </Fragment>
            )}
            {wantDelete && (
              <div className="delete-menu">
                Do you confirm?
                <button
                  onClick={() => {
                    this.deleteRental(rental._id, rentalIndex);
                  }}
                  className="btn btn-danger">
                  Yes
                </button>
                <button
                  onClick={() => {
                    this.closeDeleteMenu();
                  }}
                  className="btn btn-success">
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RentalManageCard;
