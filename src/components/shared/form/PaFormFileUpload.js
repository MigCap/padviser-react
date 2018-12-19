import React, { Component } from 'react';

export default class PaFormFileUpload extends Component {
  onChange = event => {
    const {
      input: { onChange }
    } = this.props;

    onChange(
      'https://meyersound.com/wp-content/uploads/2016/10/galileo_galaxy_main.png'
    );
  };

  render() {
    const {
      label,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
        </div>
        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}
      </div>
    );
  }
}
