import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { PaFormInput } from '../../shared/form/PaFormInput';
import { PaFormTextArea } from '../../shared/form/PaFormTextArea';
import { PaFormSelect } from '../../shared/form/PaFormSelect';
import PaFormFileUpload from '../../shared/form/PaFormFileUpload';

import PaRespError from '../../shared/form/PaRespError';

import { required } from '../../shared/form/validators';

const RentalCreateForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    rentalCreateCb,
    valid,
    categoryOptions,
    conditionOptions,
    errors
  } = props;
  return (
    <form onSubmit={handleSubmit(rentalCreateCb)}>
      <Field
        options={categoryOptions}
        name="category"
        label="Category"
        className="form-control"
        component={PaFormSelect}
        validate={[required]}
      />
      <Field
        name="brand"
        type="text"
        label="Brand"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="model"
        type="text"
        label="Model"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="type"
        type="text"
        label="Type"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="description"
        type="text"
        rows="3"
        label="Description"
        className="form-control"
        component={PaFormTextArea}
      />
      <Field
        name="image"
        label="Image"
        component={PaFormFileUpload}
        validate={[required]}
      />
      <Field
        options={conditionOptions}
        name="condition"
        label="Condition"
        className="form-control"
        component={PaFormSelect}
        validate={[required]}
      />
      <Field
        name="units"
        type="number"
        label="Units available"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="dailyRate"
        type="number"
        label="Daily Rate"
        className="form-control"
        symbol="$"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="country"
        type="text"
        label="Country"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="city"
        type="text"
        label="City"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="street"
        type="text"
        label="Street"
        className="form-control"
        component={PaFormInput}
        validate={[required]}
      />

      <button
        className="btn btn-pa btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}>
        Create Rental
      </button>
      <PaRespError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: 'rentalCreateForm',
  initialsValues: { category: 'Audio', condition: 'Good' }
})(RentalCreateForm);
