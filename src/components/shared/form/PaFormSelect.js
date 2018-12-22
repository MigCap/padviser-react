import React from 'react';

export const PaFormSelect = ({
  input,
  label,
  symbol,
  placeholder,
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
      {label && <label>{label}</label>}
      <div className="input-group input-group-sm">
        {symbol && (
          <div className="input-group-prepend">
            <div id="inputGroup-sizing-sm" className="input-group-text">
              {symbol}
            </div>
          </div>
        )}
        <select {...input} className={className} placeholder={placeholder}>
          {renderOptions()}
        </select>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
    </div>
  );
};
