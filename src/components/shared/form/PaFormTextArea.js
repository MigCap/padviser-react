import React from 'react';

export const PaFormTextArea = ({
  input,
  label,
  type,
  rows,
  className,
  meta: { touched, error }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-group">
      <textarea {...input} type={type} rows={rows} className={className}>
        {' '}
      </textarea>
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);
