import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
  renderAuthButtons() {
    const { isAuth } = this.props.auth;

    if (isAuth) {
      return (
        <p className="nav-item nav-link clickable" onClick={this.handleLogout}>
          Logout
        </p>
      );
    }

    return (
      <Fragment>
        <Link to="/login" className="nav-item nav-link">
          Login <span className="sr-only">(current)</span>
        </Link>
        <Link to="/register" className="nav-item nav-link">
          Register
        </Link>
      </Fragment>
    );
  }
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link to="/rentals" className="navbar-brand">
            Production Adviser
          </Link>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 bwm-search"
              type="search"
              placeholder='Try "New York"'
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
              type="submit">
              Search
            </button>
          </form>
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
            <div className="navbar-nav ml-auto">{this.renderAuthButtons()}</div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Header));
