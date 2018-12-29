import {
  FETCH_USER_PROFILE_INIT,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  errors: [],
  isFetching: false
};

export const userProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_INIT:
      return { ...state, data: {}, errors: [], isFetching: true };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.userProfile,
        errors: [],
        isFetching: false
      };
    case FETCH_USER_PROFILE_FAIL:
      return { ...state, data: [], errors: action.errors };

    default:
      return state;
  }
};
