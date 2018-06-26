import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// First get the profile of the user who is logged in. It does not
// have any input parameter. We will need dispatch to update app state
// If there are no profile (.catch) then return an empty profile (profile not yet made)
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); // This set app state

  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile loading. Lets the reducer know that it is loading.
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile on logout.
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
