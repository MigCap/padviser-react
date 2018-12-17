import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTAL_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  rentals: {
    data: [],
    errors: []
  },
  rental: {
    data: []
  }
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS_INIT:
      return { ...state, data: [], errors: [] };
    case FETCH_RENTAL_SUCCESS:
      return { ...state, data: action.rentals };
    case FETCH_RENTAL_FAIL:
      return { ...state, data: [], errors: action.errors };
    default:
      return state;
  }
};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return { ...state, data: action.rental };
    // return Object.assign({}, state, { data: action.rental });
    default:
      return state;
  }
};
