import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// Depending on the action.type, the flow takes different path (switch)
// IsAuthenticated is set  iff there is an action.payload
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    // case GET_ERRORS:

    default:
      return state;
  }
}
