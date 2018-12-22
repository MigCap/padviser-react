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
        name="brand"
        type="text"
        label="Item"
        placeholder="Brand"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="model"
        type="text"
        placeholder="Model"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="type"
        type="text"
        placeholder="Type"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="description"
        type="text"
        rows="3"
        placeholder="Description"
        className="form-control form-control-sm"
        component={PaFormTextArea}
      />
      <Field
        name="category"
        placeholder="Category"
        symbol="Category"
        options={categoryOptions}
        className="custom-select form-control form-control-sm"
        component={PaFormSelect}
        validate={[required]}
      />
      <Field
        options={conditionOptions}
        name="condition"
        symbol="Condition"
        className="custom-select form-control form-control-sm"
        component={PaFormSelect}
        validate={[required]}
      />
      <Field
        name="units"
        type="number"
        symbol="Number"
        placeholder="Units available"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="dailyRate"
        type="number"
        placeholder="Daily Rate"
        className="form-control form-control-sm"
        symbol="$"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="image"
        placeholder="Image"
        component={PaFormFileUpload}
        validate={[required]}
      />
      <Field
        name="country"
        type="text"
        label="Location"
        placeholder="Country"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="city"
        type="text"
        placeholder="City"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />
      <Field
        name="street"
        type="text"
        placeholder="Street"
        className="form-control form-control-sm"
        component={PaFormInput}
        validate={[required]}
      />

      <button
        className="btn btn-pa btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}>
        Add to Inventory
      </button>
      <PaRespError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: 'rentalCreateForm',
  initialsValues: { category: 'Audio', condition: 'Good' }
})(RentalCreateForm);
