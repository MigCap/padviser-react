import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from 'components/RentalSearchInput/RentalSearchInput';

import './Header.scss';


function mapStateToProps(state) {
  return {
    auth: state.auth,
    rentals: state.rentals
  };
}
class Header extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login');
  };
  renderAuthButtons(isAuth) {
    if (!isAuth) {
      return (
        <Fragment>
          <Link to="/rentals" className="nav-item nav-link link-hover">
            Inventory <span className="sr-only">(current)</span>
          </Link>
          <Link to="/login" className="nav-item nav-link link-hover">
            Login
          </Link>
          <Link to="/register" className="nav-item nav-link link-hover">
            Register
          </Link>
        </Fragment>
      );
    }
  }

  renderUserSection(isAuth, username) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle clickable anchor-button custom-nav-link"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {username.toUpperCase()}
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/users/profile">
              <i className="fa fa-user pr-2" />
              Profile
            </Link>
            <Link className="dropdown-item" to="/rentals/new">
              <i className="fa fa-plus pr-2" />
              Add Item
            </Link>
            <Link className="dropdown-item" to="/rentals/manage">
              <i className="fa fa-indent pr-2" />
              Manage Inventory
            </Link>
            <Link className="dropdown-item" to="/bookings/manage">
              <i className="fa fa-book pr-2" />
              Manage Bookings
            </Link>
            <button className="dropdown-item" onClick={this.handleLogout}>
              <i className="fa fa-power-off pr-2" />
              Logout
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    const { username, isAuth } = this.props.auth;
    return (
      <nav className="navbar navbar-dark navbar-expand-lg sticky-top">
        <div className="container">
          <Link to="/rentals" className="navbar-brand">
            <img
              src={process.env.PUBLIC_URL + '/img/PAlogo.png'}
              width="20"
              alt="logo"
            />
            Production Adviser
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="icon-bar top-bar" />
            <span className="icon-bar middle-bar" />
            <span className="icon-bar bottom-bar" />
          </button>
          <div id="navbarNavAltMarkup" className="collapse navbar-collapse bwm-navbarCollapse-wrapper">
            <div className="search-wrapper-section d-xs-block d-sm-block d-md-block d-lg-none d-xl-none">
              {this.props.location.pathname === '/' ? (
                <Fragment />
              ) : (
                <RentalSearchInput rentals={this.props.rentals} />
              )}
            </div>
            <div className="navbar-nav ml-auto">
              {isAuth && (
                <Link to="/rentals" className="nav-item nav-link link-hover">
                  INVENTORY <span className="sr-only">(current)</span>
                </Link>
              )}
              {this.renderUserSection(isAuth, username)}
              {this.renderAuthButtons(isAuth)}
            </div>
            <div className="search-wrapper-section d-none d-lg-block ml-3">
              {this.props.location.pathname === '/' ? (
                <Fragment />
              ) : (
                <RentalSearchInput rentals={this.props.rentals} />
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Header));
