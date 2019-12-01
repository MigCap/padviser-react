import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import authService from 'app/services/auth-service'
import * as actions from 'app/actions'

import { UserProfileWarehouse } from 'components/User/UserProfileWarehouse'
import { UserProfileRevenue } from 'components/User/UserProfileRevenue'
import UpdateProfileForm from 'components/User/UpdateProfileForm'
import PaFormFileUpload from 'components/shared/form/PaFormFileUpload'
import { required } from 'components/shared/form/validators'

import './UserProfile.scss'

class UserProfile extends Component {
  constructor() {
    super()

    this.state = {
      pendingPayments: [],
      numberPendingsPayments: 0,
      errors: [],
      redirect: false
    }
  }

  componentDidMount() {
    const isAuth = this.props.auth.isAuth
    const userId = authService.getUserId()
    if (isAuth) {
      this.props.dispatch(actions.fetchUserProfile(userId))
      this.getPendingPayments()
    }
  }

  getPendingPayments() {
    actions
      .getPendingPayments()
      .then(pendingPayments => {
        this.setState({ pendingPayments })
        this.getOnlyPendingPayments(pendingPayments)
      })
      .catch(err => console.error(err))
  }

  getOnlyPendingPayments(payments) {
    if (payments && payments.length > 0) {
      let numberPendingsPayments = 0
      payments.map(payment => {
        if (payment.status === 'pending') {
          numberPendingsPayments++
        }
        return numberPendingsPayments
      })
      this.setState({ numberPendingsPayments })
    }
  }

  updateUserProfile = userProfileData => {
    console.log(userProfileData);
  };

  render() {
    const {
      username,
      email,
      rentals,
      bookings,
      image,
      revenue
    } = this.props.userProfile.data

    const isAuth = this.props.auth.isAuth

    const {
      errors,
    } = this.state

    return isAuth ? (
      <div className="container bootstrap snippet user-profile-container my-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="row">
              <div className="col-6 col-lg-12 text-center mt-2">
                <img
                  src={
                    image ||
                    'https://s3.eu-west-3.amazonaws.com/pa-dev-react/user.png'
                  }
                  className="avatar img-circle img-thumbnail mb-3"
                  alt="avatar"
                />
                <h4 className="text-muted">{username}</h4>
                <h6 className="text-muted small my-3">
                  Upload a different photo...
                </h6>
                <Field
                  name="image"
                  placeholder="Image"
                  component={PaFormFileUpload}
                  validate={[required]}
                />
              </div>
              <div className="col-6 col-lg-12">
                <UserProfileWarehouse
                  rentals={rentals}
                  bookings={bookings}
                  numberPendingsPayments={this.state.numberPendingsPayments}
                />
                <UserProfileRevenue revenue={revenue} />
              </div>
            </div>
          </div>
          <div className="col-lg-8 ml-auto mt-4">
            <h4 className="mb-4 text-muted">
              Complete your profile. Get the most out of this site.
            </h4>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link custom-tab-link"
                  data-toggle="tab"
                  href="#myProfile"
                >
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link custom-tab-link active"
                  data-toggle="tab"
                  href="#updateProfile"
                >
                  Update Profile
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane" id="myProfile">
                <div className="form-group mt-3">
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

                <div className="form-group">
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
              <div className="tab-pane active" id="updateProfile">
                <UpdateProfileForm
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to={'/rentals'} />
    )
  }
}
const form = reduxForm({
  form: 'updateProfileForm',
  initialsValues: { category: 'Audio', condition: 'Good' }
})

const mapStateToProps = state => {
  return {
    auth: state.auth,
    userProfile: state.userProfile
  }
}

export default connect(mapStateToProps)(form(UserProfile))
