import axios from 'axios';
import authService from '../../app/services/auth-service';
import axiosService from '../../app/services/axios-service';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './types';

// RENTALS ACTIONS --------------------------------------------

const axiosInstance = axiosService.getInstance();

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

const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTAL_SUCCESS,
    rentals
  };
};

export const fetchRentals = () => {
  return dispatch => {
    axiosInstance
      .get('/rentals')
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)));
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

// AUTH ACTIONS ------------------------------------------------------

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const register = userData => {
  return axios
    .post('/api/v1/users/register', { ...userData })
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  };
};

export const login = userData => {
  return dispatch => {
    return axios
      .post('/api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {
        authService.savetoken(token);
        dispatch(loginSuccess());
      })
      .catch(({ response }) => {
        dispatch(loginFailure(response.data.errors));
      });
  };
};

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  };
};

// BOOKING ACTIONS -----------------------------------------------

export const createBooking = booking => {
  return axiosInstance
    .post('/bookings', booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
