import axios from 'axios';
import authService from '../../app/services/auth-service';
import axiosService from '../../app/services/axios-service';

import {
  FETCH_REVIEWS_INIT,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  FETCH_USER_PROFILE_INIT,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL,
  RESET_RENTAL_ERRORS,
  RELOAD_MAP,
  RELOAD_MAP_FINISH
} from './types';

const axiosInstance = axiosService.getInstance();

// RENTALS ACTIONS --------------------------------------------

export const createRental = rentalData => {
  return axiosInstance
    .post('/rentals', { ...rentalData })
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

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

// MAP ACTIONS ---------------------------------------------------

export const reloadMap = () => {
  return {
    type: RELOAD_MAP
  };
};
export const reloadMapFinish = () => {
  return {
    type: RELOAD_MAP_FINISH
  };
};

// VERIFY USER --- USER GUARD ---------------------------------------------------

export const verifyRentalOwner = rentalId => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
};

// REVIEWS ACTIONS ---------------------------------------------------

export const createReview = reviewData => {
  return axiosInstance
    .post(`/reviews?bookingId=${reviewData.bookingId}`, { ...reviewData })
    .then(res => res.data)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

const fetchReviewsInit = () => {
  return {
    type: FETCH_REVIEWS_INIT
  };
};

const fetchReviewsSuccess = reviews => {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    reviews
  };
};

const fetchReviewsFail = errors => {
  return {
    type: FETCH_REVIEWS_FAIL,
    errors
  };
};

export const fetchReviews = rentalId => {
  const url = `/reviews?rentalId=${rentalId}`;
  return dispatch => {
    dispatch(fetchReviewsInit());

    axiosInstance
      .get(url)
      .then(res => res.data)
      .then(reviews => dispatch(fetchReviewsSuccess(reviews)))
      .catch(({ response }) =>
        dispatch(fetchReviewsFail(response.data.errors))
      );
  };
};

// USERS PROFILE ACTIONS ---------------------------------------------------

const fetchUserProfileInit = () => {
  return {
    type: FETCH_USER_PROFILE_INIT
  };
};

const fetchUserProfileSuccess = userProfile => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    userProfile
  };
};

const fetchUserProfileFail = errors => {
  return {
    type: FETCH_USER_PROFILE_FAIL,
    errors
  };
};

export const fetchUserProfile = userId => {
  const url = `/users/${userId}`;
  return dispatch => {
    dispatch(fetchUserProfileInit());

    axiosInstance
      .get(url)
      .then(res => res.data)
      .then(userProfile => dispatch(fetchUserProfileSuccess(userProfile)))
      .catch(({ response }) =>
        dispatch(fetchUserProfileFail(response.data.errors))
      );
  };
};

// PAYMENTS ACTIONS ---------------------------------------------------

export const getPendingPayments = () => {
  return axiosInstance
    .get('/payments')
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};

export const acceptPayment = payment => {
  return axiosInstance
    .post('/payments/accept', payment)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
export const declinePayment = payment => {
  return axiosInstance
    .post('/payments/decline', payment)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
