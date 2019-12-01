import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { PaFormInput } from 'components/shared/form/PaFormInput'
import PaRespError from 'components/shared/form/PaRespError'
import { required } from 'components/shared/form/validators'

class UpdateProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      redirect: false
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <form className="form">
        <div className="form-group">
          <label htmlFor="first_name">
            <h6>Personal Info</h6>
          </label>
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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
        <div className="form-group">
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <div className="input-group-text">Company Position</div>
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <div className="col-xs-12">
            <br />
            <button className="btn btn-sm btn-success pull-right" type="submit">
              <i className="glyphicon glyphicon-ok-sign" /> Update Profile
            </button>
            {/*<button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>*/}
          </div>
        </div>
      </form>
    )
  }
}

export default UpdateProfileForm
