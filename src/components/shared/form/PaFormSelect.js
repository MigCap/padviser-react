import React from 'react';

export const PaFormSelect = ({
  input,
  label,
  options,
  className,
  meta: { touched, error }
}) => {
  function renderOptions() {
    return options.map((option, index) => {
      return (
        <option value={option} key={index}>
          {option}
        </option>
      );
    });
  }
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <select {...input} className={className}>
          {renderOptions()}
        </select>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
    </div>
  );
};
