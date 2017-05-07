import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authentificated: true };
    case UNAUTH_USER:
      return { ...state, authentificated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
