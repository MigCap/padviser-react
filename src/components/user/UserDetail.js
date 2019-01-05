import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PaFormFileUpload from '../shared/form/PaFormFileUpload';
import { required } from '../shared/form/validators';
import { Redirect } from 'react-router-dom';

import authService from '../../app/services/auth-service';
import * as actions from '../../app/actions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    userProfile: state.userProfile
  };
}

class UserDetail extends Component {
  constructor() {
    super();

    this.state = {
      pendingPayments: [],
      numberPendingsPayments: 0
    };
  }

  componentDidMount() {
    const isAuth = this.props.auth.isAuth;
    const userId = authService.getUserId();
    if (isAuth) {
      this.props.dispatch(actions.fetchUserProfile(userId));
      this.getPendingPayments();
    }
  }

  getPendingPayments() {
    actions
      .getPendingPayments()
      .then(pendingPayments => {
        this.setState({ pendingPayments });
        this.getOnlyPendingPayments(pendingPayments);
      })
      .catch(err => console.error(err));
  }

  getOnlyPendingPayments(payments) {
    if (payments && payments.length > 0) {
      let numberPendingsPayments = 0;
      payments.map(payment => {
        if (payment.status === 'pending') {
          numberPendingsPayments++;
        }
        return numberPendingsPayments;
      });
      this.setState({ numberPendingsPayments });
    }
  }

  render() {
    const {
      username,
      email,
      rentals,
      bookings,
      image,
      revenue
    } = this.props.userProfile.data;
    const isAuth = this.props.auth.isAuth;

    return isAuth ? (
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
                src={
                  image ||
                  'https://s3.eu-west-3.amazonaws.com/pa-dev-react/user.png'
                }
                className="avatar img-circle img-thumbnail mb-3"
                alt="avatar"
              />
              <h4 className="text-muted">{username}</h4>
              <h6 className="text-muted mt-4">Upload a different photo...</h6>
              <Field
                name="image"
                placeholder="Image"
                component={PaFormFileUpload}
                validate={[required]}
              />
            </div>

            {/*<div className="panel panel-default">
              <div className="panel-heading mt-3">
                Website <i className="fa fa-link fa-1x" />
              </div>
            </div>*/}

            <ul className="list-group mt-5">
              <li className="list-group-item list-group-item-secondary text-muted text-center">
                <i className="fa fa-building mr-2" />
                My Warehouse
              </li>

              <Link
                className="list-group-item list-group-item-action text-right"
                to="/rentals/manage">
                <span className="pull-left">
                  <strong>Items</strong>
                </span>{' '}
                {rentals && rentals.length}
              </Link>

              <Link
                className="list-group-item list-group-item-action text-right"
                to="/bookings/manage">
                <span className="pull-left">
                  <strong>My Bookings</strong>
                </span>{' '}
                {bookings && bookings.length}
              </Link>

              <Link
                className="list-group-item list-group-item-action text-right"
                to="/bookings/manage">
                <span className="pull-left">
                  <strong>Pending Bookings</strong>
                </span>{' '}
                {this.state.numberPendingsPayments}
              </Link>
            </ul>

            <ul className="list-group mt-3">
              <li className="list-group-item list-group-item-secondary text-muted text-center">
                <i className="fa fa-credit-card mr-2" />
                My Revenue
              </li>

              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Dollars</strong>
                </span>{' '}
                {revenue / 100} $
              </li>
            </ul>
            {/*<div className="panel panel-default mt-3">
              <div className="panel-heading">Social Media</div>
              <div className="panel-body mt-3">
                <i className="fa fa-facebook fa-2x mr-1" />{' '}
                <i className="fa fa-twitter fa-2x mr-1" />{' '}
                <i className="fa fa-instagram fa-2x mr-1" />{' '}
              </div>
            </div>*/}
          </div>

          <div className="col-sm-8 ml-auto">
            <h4 className="mb-4 text-muted">
              Complete your profile to get the most out of this site.
            </h4>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link custom-tab-link"
                  data-toggle="tab"
                  href="#myProfile">
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link custom-tab-link active"
                  data-toggle="tab"
                  href="#updateProfile">
                  Update Profile
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane" id="myProfile">
                <form className="form">
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="username" />
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">User Name</div>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="username"
                          id="username"
                          placeholder={username}
                          title="enter your user name."
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Email</div>
                        </div>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          name="email"
                          id="email"
                          placeholder={email}
                          title="enter your email."
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  {/*<div className="form-group">
                    <div className="col-xs-12">
                      <br />
                      <button className="btn btn-sm btn-success" type="submit">
                        <i className="glyphicon glyphicon-ok-sign" /> Save
                      </button>
                      <button className="btn btn-sm" type="reset">
                        <i className="glyphicon glyphicon-repeat" /> Reset
                      </button>
                    </div>
                  </div>*/}
                </form>
              </div>

              <div className="tab-pane active" id="updateProfile">
                <form className="form">
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="username">
                        <h6>Personal Info</h6>
                      </label>
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">User Name</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          id="username"
                          placeholder="Your desired user name"
                          title="Enter Your User Name."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">First name</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          id="first_name"
                          placeholder="Your First Name"
                          title="enter your first name if any."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Last name</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          id="last_name"
                          placeholder="Your Last Name"
                          title="enter your last name if any."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Mobile</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="mobile"
                          id="mobile"
                          placeholder="Enter mobile number"
                          title="enter your mobile number if any."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="email">
                        <h6>Email</h6>
                      </label>
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Email</div>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Enter Your Email"
                          title="Enter Your Email."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Confirm Email</div>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          name="confirm-email"
                          id="confirm-email"
                          placeholder="Confirm Your Email"
                          title="Confirm Your Email."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="company">
                        <h6>Company</h6>
                      </label>
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Company Name</div>
                        </div>
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
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            Company Position
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="company-position"
                          id="company-position"
                          placeholder="Enter Company Position"
                          title="Enter your company position if any."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="email">
                        <h6>Location</h6>
                      </label>
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Country</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          placeholder="Country"
                          title="Enter a country"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">City</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          placeholder="City"
                          title="Enter a city"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Street</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          placeholder="Street"
                          title="Enter a street"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-12">
                      <br />
                      <button
                        className="btn btn-sm btn-success pull-right"
                        type="submit">
                        <i className="glyphicon glyphicon-ok-sign" /> Update
                        Profile
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
    ) : (
      <Redirect to={'/rentals'} />
    );
  }
}
const form = reduxForm({
  form: 'updateProfileForm',
  initialsValues: { category: 'Audio', condition: 'Good' }
});

export default connect(mapStateToProps)(form(UserDetail));
