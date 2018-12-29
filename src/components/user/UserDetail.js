import React, { Component } from 'react';
import { connect } from 'react-redux';

import authService from '../../app/services/auth-service';
import * as actions from '../../app/actions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    userProfile: state.userProfile
  };
}

class UserDetail extends Component {
  componentDidMount() {
    const userId = authService.getUserId();
    this.props.dispatch(actions.fetchUserProfile(userId));
  }
  render() {
    const { username, email, rentals, bookings } = this.props.userProfile.data;
    console.log(this.props.userProfile.data);
    return (
      <div className="container bootstrap snippet user-profile-container my-5">
        {/*<div className="row">
          <div className="col-sm-10">
            <h1>{username}</h1>
          </div>
          <div className="col-sm-2">
            <h2>Revenue: 100$</h2>
          </div>
        </div>*/}
        <div className="row">
          <div className="col-sm-3">
            <div className="text-center">
              <img
                src={process.env.PUBLIC_URL + '/img/user.png'}
                className="avatar img-circle img-thumbnail mb-3"
                alt="avatar"
              />
              <h4>{username}</h4>
              <h6 className="mt-4">Upload a different photo...</h6>
              <input
                type="file"
                className="text-center center-block file-upload"
              />
            </div>
            <div className="panel panel-default">
              <div className="panel-heading mt-3">
                Website <i className="fa fa-link fa-1x" />
              </div>
            </div>
            <ul className="list-group mt-3">
              <li className="list-group-item text-muted text-center">
                <i className="fa fa-building mr-2" />
                My Warehouse
              </li>
              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Items</strong>
                </span>{' '}
                {rentals && rentals.length}
              </li>
              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Bookings</strong>
                </span>{' '}
                {bookings && bookings.length}
              </li>
            </ul>
            <div className="panel panel-default mt-3">
              <div className="panel-heading">Social Media</div>
              <div className="panel-body mt-3">
                <i className="fa fa-facebook fa-2x mr-1" />{' '}
                <i className="fa fa-twitter fa-2x mr-1" />{' '}
                <i className="fa fa-instagram fa-2x mr-1" />{' '}
              </div>
            </div>
          </div>

          <div className="col-sm-8 ml-auto">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#settings">
                  Settings
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <form className="form">
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="username">
                        <h4>User name</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        placeholder={username}
                        title="enter your user name."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="email">
                        <h4>Email</h4>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder={email}
                        title="enter your email."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-12">
                      <br />
                      <button className="btn btn-sm btn-success" type="submit">
                        <i className="glyphicon glyphicon-ok-sign" /> Save
                      </button>
                      <button className="btn btn-sm" type="reset">
                        <i className="glyphicon glyphicon-repeat" /> Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="settings">
                <form className="form">
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="first_name">
                        <h4>First name</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        id="first_name"
                        placeholder="first name"
                        title="enter your first name if any."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="last_name">
                        <h4>Last name</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        id="last_name"
                        placeholder="last name"
                        title="enter your last name if any."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="company">
                        <h4>Company</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        id="company"
                        placeholder="Enter Company Name"
                        title="Enter your company name if any."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="mobile">
                        <h4>Mobile</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        id="mobile"
                        placeholder="enter mobile number"
                        title="enter your mobile number if any."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="email">
                        <h4>Location</h4>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="location"
                        placeholder="somewhere"
                        title="enter a location"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-12">
                      <br />
                      <button
                        className="btn btn-lg btn-success pull-right"
                        type="submit">
                        <i className="glyphicon glyphicon-ok-sign" /> Save
                      </button>
                      {/*<button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>*/}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserDetail);
