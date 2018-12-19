import React, { Component } from 'react';

import * as actions from '../../../app/actions';

export default class PaFormFileUpload extends Component {
  constructor() {
    super();

    this.setupReader();

    this.state = {
      selectedFile: undefined,
      imageBase64: '',
      pending: false,
      status: 'INIT'
    };
  }

  setupReader() {
    this.reader = new FileReader();

    this.reader.addEventListener('load', event => {
      this.setState({ imageBase64: event.target.result });
    });
  }

  onChange = event => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.setState({ selectedFile });

      this.reader.readAsDataURL(selectedFile);
    }
  };

  onError(error) {
    this.setState({ pending: true, status: 'FAIL' });
  }

  onSuccess(uploadedImage) {
    const {
      input: { onChange }
    } = this.props;

    this.setState({ pending: false, status: 'OK' });

    onChange(uploadedImage);
  }

  uploadImage() {
    const { selectedFile } = this.state;

    if (selectedFile) {
      this.setState({ pending: true, status: 'INIT' });

      actions.uploadImage(selectedFile).then(
        uploadedImage => {
          this.onSuccess(uploadedImage);
        },
        error => {
          this.onError(error);
        }
      );
    }
  }

  renderSpinner() {
    const { pending } = this.state;

    if (pending) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }

  renderImageStatus() {
    const { status } = this.state;

    if (status === 'OK') {
      return (
        <div className="alert alert-success">Image uploaded Succesfully !!</div>
      );
    }

    if (status === 'FAIL') {
      return <div className="alert alert-danger">Image Upload Fail !!</div>;
    }
  }

  render() {
    const {
      label,
      meta: { touched, error }
    } = this.props;
    const { selectedFile, imageBase64 } = this.state;
    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-select">
          <span className="upload-text">Select an Image</span>
          <input
            onChange={this.onChange}
            type="file"
            accept=".jpg, .jpeg, .png"
          />
        </label>
        {selectedFile && (
          <button
            className="btn btn-success btn-upload"
            type="button"
            disable={selectedFile ? 'disable' : undefined}
            onClick={() => this.uploadImage()}>
            Upload Image
          </button>
        )}
        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}

        {imageBase64 && (
          <div className="img-preview-container">
            <div
              className="img-preview"
              style={{ backgroundImage: 'url(' + imageBase64 + ')' }}
            />
            {this.renderSpinner()}
          </div>
        )}

        {this.renderImageStatus()}
      </div>
    );
  }
}
