// This file combines all reducers this app uses
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer, // If this is invoked anywhere, it uses auth.something
  errors: errorReducer,
  profile: profileReducer
});
