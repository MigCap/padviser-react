import React, { Fragment } from 'react';
import EditableComponent from './EditableComponent';

export default class EditableSelect extends EditableComponent {
  renderOptions(options) {
    return options.map((option, index) => (
      <option value={option} key={index}>
        {`${option}`}
      </option>
    ));
  }
  renderComponentView() {
    const { value, isActive } = this.state;
    const { className, options } = this.props;

    if (isActive) {
      return (
        <Fragment>
          <select
            onChange={event => this.handleChange(event)}
            value={value}
            className={className}>
            {this.renderOptions(options)}
          </select>
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
