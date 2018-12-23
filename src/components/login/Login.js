import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';

import * as actions from 'app/actions';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

class Login extends Component {
  loginUser = userData => {
    this.props.dispatch(actions.login(userData));
  };

  render() {
    const { isAuth, errors } = this.props.auth;
    const { successRegister } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{ pathname: '/rentals' }} />;
    }
    return (
      <div className="container pt-5">
        <section id="login">
          <div className="bwm-form">
            <div className="row">
              <div className="col-md-5">
                <h1>Login</h1>
                {successRegister && (
                  <div className="alert alert-success">
                    <p>
                      You have been succesfully registered, please login now.
                    </p>
                  </div>
                )}
                <LoginForm loginCb={this.loginUser} errors={errors} />
                <p className="mt-3">
                  You need to login to book and see rental details.
                </p>
              </div>
              <div className="col-md-6 ml-auto">
                <div className="image-container">
                  <h2 className="catchphrase">
                    Book or Rent any AV equipement just with a few clicks.
                  </h2>
                  <img
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

export default connect(mapStateToProps)(Login);
