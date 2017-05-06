import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  form,
  authentification: AuthReducer
});

export default rootReducer;
