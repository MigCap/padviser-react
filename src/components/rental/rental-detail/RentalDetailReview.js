import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';

class RentalDetailReview extends Component {
  render() {
    const review = this.props.review;
    return (
      <div className="row">
        <div className="col-lg-10">
          <div className="review-card-container">
            <div className="avatar-container">
              <img
                src={process.env.PUBLIC_URL + '/img/user.png'}
                alt="owner"
                className="img-thumbnail"
              />
              <p>{moment(review.createdAt).fromNow()}</p>
            </div>
            <div className="review-body-container">
              <p>
                {review.user.username}
                <br />
                <span>"{review.text}"</span>
              </p>
              <StarRatings
                rating={review.rating}
                starRatedColor="#61dafb"
                starHoverColor="grey"
                isSelectable={false}
                isAggregateRating={false}
                numberOfStars={5}
                starDimension="15px"
                starSpacing="0px"
                name="rentalDetailRating"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RentalDetailReview;
