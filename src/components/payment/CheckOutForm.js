import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import {
  cardElementOptions,
  formStyles,
  paragraphStyle,
  buttonStyles
} from './styles';

class CheckOutForm extends Component {
  state = {
    error: undefined
  };

  handleSubmit = e => {
    const { stripe, setPaymentToken } = this.props;
    this.setState({ error: undefined });

    e.preventDefault();

    if (stripe) {
      stripe.createToken().then(payload => {
        if (payload.error) {
          setPaymentToken(undefined);
          return this.setState({ error: payload.error.message });
        }
        setPaymentToken(payload.token.id);
      });
    } else {
      console.error("Stripe.js hasn't loaded yet!");
    }
  };

  render() {
    const { error } = this.state;
    const { paymentTokenExists } = this.props;
    return (
      <form onSubmit={this.handleSubmit} {...formStyles()}>
        <CardElement {...cardElementOptions()} />
        <p {...paragraphStyle()}>
          * You will not be charged until owner confirm your booking.
        </p>

        {paymentTokenExists && !error && (
          <div className="alert alert-success payment-alert-success">
            Card Successfully Accepted!
          </div>
        )}

        {error && !paymentTokenExists && (
          <div className="alert alert-danger payment-alert">{error}</div>
        )}

        <button className="btn btn-sm btn-secondary" {...buttonStyles()}>
          Submit Card Details. You will not be charged yet
        </button>
      </form>
    );
  }
}

export default injectStripe(CheckOutForm);
