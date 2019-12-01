import React from 'react';

export const PaFormInput = ({
  input,
  label,
  name,
  prependText,
  type,
  placeholder,
  symbol,
  className,
  meta: { touched, error }
}) => (
  <div className="form-group">
    {label && <label htmlFor={input.name}>{label}</label>}
    <div className="input-group input-group-sm">
      {prependText && (
        <div className="input-group-prepend">
          <div id="inputGroup-sizing-sm" className="input-group-text">{prependText}</div>
        </div>
      )}
      {/* {symbol && (
        <div className="input-group-prepend">
          <div id="inputGroup-sizing-sm" className="input-group-text">
            {symbol}
          </div>
        </div>
      )} */}
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={className}
      />
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);
