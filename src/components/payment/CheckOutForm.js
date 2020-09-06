import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import ReCAPTCHA from "react-google-recaptcha";

import {
  cardElementOptions,
  formStyles,
  paragraphStyle,
  buttonStyles,
} from "./styles";

class CheckOutForm extends Component {
  state = {
    error: undefined,
    checkingCard: false,
  };

  handleSubmit = (e) => {
    const { stripe, setPaymentToken } = this.props;
    this.setState({ error: undefined, checkingCard: true });

    e.preventDefault();

    if (stripe) {
      stripe.createToken().then((payload) => {
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

  onChange = (value) => {
    console.log("RECAP Captcha value ==> ", value);
  };

  render() {
    const { error, checkingCard } = this.state;
    const { paymentTokenExists, errors } = this.props;

    // const recaptchaRef = React.createRef();

    return (
      <form onSubmit={this.handleSubmit} {...formStyles()}>
        <CardElement {...cardElementOptions()} />
        <p {...paragraphStyle()}>
          * You will not be charged until owner confirm your booking.
        </p>
        <div className="mt-3 mb-2">
          <ReCAPTCHA
            ref={(ref) => (this.recaptcha = ref)}
            sitekey="site kay"
            onChange={this.onChange}
          />
        </div>

        {paymentTokenExists && !error && (
          <div className="alert alert-success payment-alert-success">
            Card Successfully Accepted!
          </div>
        )}

        {error && !paymentTokenExists && (
          <div className="alert alert-danger payment-alert">{error}</div>
        )}

        {checkingCard && !paymentTokenExists && !error && !errors && (
          <div className="mt-3" style={{ width: "100%" }}>
            <div className="img-loading-overlay-button">
              <div className="img-spinning-circle-button" />
            </div>
          </div>
        )}

        <button
          className="btn btn-sm btn-secondary mt-3"
          {...buttonStyles()}
          style={{ width: "100%" }}
        >
          Submit Card Details. You will not be charged yet
        </button>
      </form>
    );
  }
}

export default injectStripe(CheckOutForm);
