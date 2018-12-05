import * as redux from 'redux';

export const configureStore = () => {
  const store = redux.createStore(() => {
    return {
      rentals: []
    };
  });

  return store;
};
