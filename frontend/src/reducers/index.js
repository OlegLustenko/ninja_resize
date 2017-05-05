import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  authentification: AuthReducer
});

export default rootReducer;
