import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import { userBookingsReducer } from './booking-reducer';
import { authReducer } from './auth-reducer';
import { rentalMapReducer } from './map-reducer';

import { reducer as formReducer } from 'redux-form';

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    form: formReducer,
    auth: authReducer,
    userBookings: userBookingsReducer,
    map: rentalMapReducer
  });

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
