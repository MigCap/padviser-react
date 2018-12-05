import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer
  });

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
