import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// import AuthReducer_v1 from './reducer_auth';
import AuthReducer from './auth_reducer_v2';

const rootReducer = combineReducers({
  form,
  auth: AuthReducer
});

export default rootReducer;
