import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class UserGuard extends Component {
  render() {
    const { isAllowed, isFeching } = this.props;

    if (isAllowed && !isFeching) {
      return this.props.children;
    } else if (!isAllowed && !isFeching) {
      return <Redirect to={'/rentals'} />;
    } else {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }
}
