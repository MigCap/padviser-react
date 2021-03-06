import React from 'react';

export default function PaRespError(props) {
  const errors = props.errors;
  return (
    errors.length > 0 && (
      <div className="alert alert-danger pa-res-errors">
        {errors.map((error, index) => (
          <p key={index}>{error.detail}</p>
        ))}
      </div>
    )
  );
}
