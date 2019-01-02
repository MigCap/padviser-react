import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import CheckOutForm from './CheckOutForm';

class Payment extends Component {
  render() {
    return (
      <div className="payment">
        <Elements>
          <CheckOutForm {...this.props} />
        </Elements>
      </div>
    );
  }
}

export default Payment;
