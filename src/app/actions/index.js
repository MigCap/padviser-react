import axios from 'axios';
import authService from '../../app/services/auth-service';
import axiosService from '../../app/services/axios-service';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTAL_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
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

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  };
};

const fetchRentalsFail = errors => {
  return {
    type: FETCH_RENTAL_FAIL,
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

export const fetchRentalById = rentalId => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  };
};

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

// USER BOOKINGS ACTIONS ------------------------------------------------------

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  };
};

const fetchUserBookingsSuccess = userBookings => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  };
};

const fetchUserBookingsFail = errors => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  };
};

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance
      .get('/bookings/manage')
      .then(res => res.data)
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({ response }) =>
        dispatch(fetchUserBookingsFail(response.data.errors))
      );
  };
};

// AUTH ACTIONS ------------------------------------------------------

const loginSuccess = () => {
  const username = authService.getUserName();
  return {
    type: LOGIN_SUCCESS,
    username
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

// IMAGE UPLOAD ---------------------------------------------------

export const uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image);

  return axiosInstance
    .post('/image-upload', formData)
    .then(json => {
      return json.data.imageUrl;
    })
    .catch(({ response }) => {
      Promise.reject(response.data.errors[0]);
    });
};
