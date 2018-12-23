import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';

import * as actions from 'app/actions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    };
  }
  registerUser = userData => {
    actions
      .register(userData)
      .then(
        registered => this.setState({ redirect: true }),
        errors => this.setState({ errors })
      );
  };
  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{ pathname: '/login', state: { successRegister: true } }}
        />
      );
    }

    return (
      <div className="container pt-5">
        <section id="register">
          <div className="bwm-form">
            <div className="row">
              <div className="col-md-5">
                <h1>Register</h1>
                <RegisterForm submitCb={this.registerUser} errors={errors} />
              </div>
              <div className="col-md-6 ml-auto">
                <div className="image-container">
                  <h2 className="catchphrase">
                    As our member you have access to the most extensive AV
                    equipment database wordlwide.
                  </h2>
                  <img
                    className="img-fluid"
                    src={process.env.PUBLIC_URL + 'img/login-image.jpeg'}
                    alt="loginImage"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
