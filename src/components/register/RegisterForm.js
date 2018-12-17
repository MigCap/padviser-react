import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { PaFormInput } from '../shared/form/PaFormInput';
import PaRespError from '../shared/form/PaRespError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        placeholder="Your desire Username"
        className="form-control"
        component={PaFormInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={PaFormInput}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={PaFormInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component={PaFormInput}
      />
      <button
        className="btn btn-pa btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}>
        Register
      </button>
      <PaRespError errors={errors} />
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = 'Username min length is 4 characters';
  }

  if (!values.email) {
    errors.email = 'Please enter a valid email!';
  }

  if (values.password && values.password.length < 8) {
    errors.password = 'Password min length is 8 characters';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Password must be the same';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password confirmation';
  }
  return errors;
};

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm);
