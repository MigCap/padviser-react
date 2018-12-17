import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from './RentalSearchInput';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
class Header extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login');
  };
  renderAuthButtons(isAuth) {
    if (isAuth) {
      return (
        <p className="nav-item nav-link clickable" onClick={this.handleLogout}>
          Logout
        </p>
      );
    }

    return (
      <Fragment>
        <Link to="/login" className="nav-item nav-link active">
          Login <span className="sr-only">(current)</span>
        </Link>
        <Link to="/register" className="nav-item nav-link">
          Register
        </Link>
      </Fragment>
    );
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle clickable anchor-button"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Owner Section
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/rentals/new">
              Create Rental
            </Link>
            <Link className="dropdown-item" to="#">
              Manage Rentals
            </Link>
            <Link className="dropdown-item" to="#">
              Manage Bookings
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    const { username, isAuth } = this.props.auth;
    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link to="/rentals" className="navbar-brand">
            <div className="navbar-brand">
              <img
                src={process.env.PUBLIC_URL + 'img/PAlogo.png'}
                width="20"
                alt="logo"
              />
            </div>
            Production Adviser
          </Link>
          <RentalSearchInput />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              {isAuth && (
                <p className="nav-item nav-link user-name">{username}</p>
              )}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Header));
