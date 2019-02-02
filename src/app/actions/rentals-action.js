import axios from 'axios';
import axiosService from '../../app/services/axios-service';
import { reloadMap } from './index';

import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL,
  RESET_RENTAL_ERRORS
} from './types';

const axiosInstance = axiosService.getInstance();

// FETCH RENTALS

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  };
};

const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  };
};

const fetchRentalsFail = errors => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  };
};

export const fetchRentals = city => {
  const url = city ? `/rentals?city=${city}` : '/rentals';
  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance
      .get(url)
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({ response }) =>
        dispatch(fetchRentalsFail(response.data.errors))
      );
  };
};

// FETCH RENTAL BY ID

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

export const fetchRentalById = rentalId => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  };
};

// CREATE NEW RENTAL

export const createRental = rentalData => {
  return axiosInstance
    .post('/rentals', { ...rentalData })
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

// USER RENTALS ACTIONS ------------------------------------------------------

export const getUserRentals = () => {
  return axiosInstance
    .get('/rentals/manage')
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

export const deleteRental = rentalId => {
  return axiosInstance
    .delete(`/rentals/${rentalId}`)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

// UPDATE RENTAL

export const resetRentalErrors = () => {
  return {
    type: RESET_RENTAL_ERRORS
  };
};

const updateRentalSuccess = updatedRental => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental
  };
};

const updateRentalFail = errors => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors
  };
};

export const updateRental = (id, rentalData) => {
  return dispatch => {
    axiosInstance
      .patch(`/rentals/${id}`, rentalData)
      .then(res => res.data)
      .then(updatedRental => {
        dispatch(updateRentalSuccess(updatedRental));

        if (rentalData.city || rentalData.street) {
          dispatch(reloadMap());
        }
      })
      .catch(({ response }) =>
        dispatch(updateRentalFail(response.data.errors))
      );
  };
};
