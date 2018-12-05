import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT
} from './types';

const rentals = [
  {
    id: '1',
    category: 'audio',
    type: 'Microphone',
    brand: 'Shure',
    model: 'SM58',
    description: 'Classic Mic',
    units: 4,
    condition: 'ok average',
    city: 'New York',
    street: 'Times Sqaure',
    image: 'http://via.placeholder.com/350x250',
    dailyRate: 34,
    createdAt: '24/12/2017'
  },
  {
    id: '2',
    category: 'video',
    type: 'Proyector',
    brand: 'Christie',
    model: 'C5000',
    description: '5000 Lumens proyector',
    units: 2,
    condition: 'mint',
    city: 'San Francisco',
    street: 'Main street',
    image: 'http://via.placeholder.com/350x250',
    dailyRate: 12,
    createdAt: '24/12/2017'
  },
  {
    id: '3',
    category: 'lights',
    type: 'Some lighting gear',
    brand: 'Robe',
    model: 'Robe-J3',
    units: 2,
    condition: 'bad',
    description: 'Some light description',
    city: 'Bratislava',
    street: 'Hlavna',
    image: 'http://via.placeholder.com/350x250',
    dailyRate: 334,
    createdAt: '24/12/2017'
  },
  {
    id: '4',
    category: 'audio',
    type: 'Speaker',
    brand: 'D&B',
    model: 'T10',
    units: 2,
    condition: 'mint',
    description: 'Nice powerfull speakers',
    city: 'Berlin',
    street: 'Haupt strasse',
    image: 'http://via.placeholder.com/350x250',
    dailyRate: 33,
    createdAt: '24/12/2017'
  }
];

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
    // simulation of server call
    setTimeout(() => {
      const rental = rentals.find(rental => rental.id === rentalId);
      dispatch(fetchRentalByIdSuccess(rental));
    }, 1000);
  };
};
