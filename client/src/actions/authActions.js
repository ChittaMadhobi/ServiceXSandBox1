import axios from 'axios';
import { GET_ERRORS } from './types';

// Register user .. we introoduce dispatch - nesting registerUser function
// and dispatch function via sequence of => arrows
export const registerUser = (userData, history) => dispatch => {
  //console.log('About to invoke axios from authActions.js');
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
