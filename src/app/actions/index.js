import { FETCH_RENTALS } from './types';
import { FETCH_RENTAL_BY_ID_SUCCESS } from './types';

export const fetchRentals = () => {
  return {
    type: FETCH_RENTALS,
    rentals
  };
};

export const fetchRentalById = rentalId => {
  return function(dispatch) {
    // simulation of server call
    setTimeout(() => {
      const rental = rentals.find(rental => rental.id === rentalId);
      dispatch(fetchRentalByIdSuccess(rental));
    }, 1000);
  };
};

export const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};
