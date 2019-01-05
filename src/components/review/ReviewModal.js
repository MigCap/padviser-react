import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import { Field, reduxForm } from 'redux-form';
import { PaFormTextArea } from '../shared/form/PaFormTextArea';
import StarRatings from 'react-star-ratings';

import PaRespError from '../shared/form/PaRespError';

import { required } from '../shared/form/validators';

class ReviewModal extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      rating: 0
    };
  }

  openModal = () => {
    this.setState({
      open: true
    });
  };
  closeModal = () => {
    this.setState({
      open: false
    });
  };

  handleCreateReview(reviewData) {
    this.props.reset('reviewCreateForm');

    const user = this.props.booking.user;
    const bookingId = this.props.booking._id;
    const rating = this.state.rating;
    const text = reviewData.review;
    const review = { user, bookingId, rating, text };

    this.props.reviewCreateCb(review);
  }

  changeRating = rating => {
    this.setState({
      rating: rating
    });
  };

  render() {
    const { handleSubmit, pristine, submitting, valid, errors } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          onClick={this.openModal}
          className="badge badge-pill btn-pa-booking">
          Write a Review
        </button>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          little
          classNames={{ modal: 'review-booking-modal' }}>
          <h4 className="modal-title title">Review your experience</h4>
          <form
            onSubmit={handleSubmit(reviewData =>
              this.handleCreateReview(reviewData)
            )}>
            <Field
              name="review"
              type="text"
              rows="4"
              cols="50"
              placeholder="Write your review"
              className="form-control form-control-sm"
              validate={[required]}
              component={PaFormTextArea}
            />
            <div className="review-rating">
              <StarRatings
                rating={this.state.rating}
                starRatedColor="#61dafb"
                starHoverColor="grey"
                isSelectable={true}
                isAggregateRating={false}
                changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="20px"
                name="rating"
              />
            </div>
            <PaRespError errors={errors} />
            <div className="modal-footer">
              <button
                className="btn btn-sm btn-pa btn-form"
                type="submit"
                disabled={
                  !valid || pristine || submitting || this.state.rating <= 0
                }>
                Confirm
              </button>
              <button
                type="button"
                onClick={this.closeModal}
                className="btn btn-sm btn-pa">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'reviewCreateForm'
})(ReviewModal);
