import React, { Fragment } from 'react';
import EditableComponent from './EditableComponent';

export default class EditableInput extends EditableComponent {
  renderComponentView() {
    const { value, isActive } = this.state;
    const { className, type } = this.props;

    if (isActive) {
      return (
        <Fragment>
          <input
            onChange={event => this.handleChange(event)}
            value={value}
            type={type ? type : ''}
            className={className}
          />
          <button
            onClick={() => this.update()}
            className="btn btn-success btn-editable"
            type="button">
            Save
          </button>
          <button
            onClick={() => this.disableEdit()}
            className="btn btn-warning btn-editable"
            type="button">
            Close
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <span className={className}>{value}</span>
        <button
          onClick={() => this.enableEdit()}
          className="btn btn-warning btn-editable"
          type="button">
          <i className="fa fa-edit" />
          Edit
        </button>
      </Fragment>
    );
  }

  render() {
    return (
      <div className="editableComponent" style={this.props.containerStyle}>
        {this.renderComponentView()}
      </div>
    );
  }
}
