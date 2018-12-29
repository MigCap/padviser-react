import {
  FETCH_REVIEWS_INIT,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  reviews: {
    data: [],
    errors: []
  }
};

export const reviewReducer = (state = INITIAL_STATE.reviews, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_INIT:
      return { ...state, data: [], errors: [] };
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, data: action.reviews, errors: [] };
    case FETCH_REVIEWS_FAIL:
      return { ...state, data: [], errors: action.errors };

    default:
      return state;
  }
};
