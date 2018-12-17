import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { PaFormInput } from '../shared/form/PaFormInput';
import PaRespError from '../shared/form/PaRespError';

import { required, minLength4 } from '../shared/form/validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, loginCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(loginCb)}>
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={PaFormInput}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <button
        className="btn btn-pa btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}>
        Login
      </button>
      <PaRespError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
