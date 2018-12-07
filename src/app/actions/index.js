import axios from 'axios';

import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT
} from './types';

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};
const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};

export const fetchRentals = () => {
  return {
    type: FETCH_RENTALS,
    rentals
  };
};

export const fetchRentalById = rentalId => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    axios.get(`http://localhost:3001/api/v1/rentals/${rentalId}`).then(() => {
      dispatch(fetchRentalByIdSuccess(rental));
    });
  };
};
