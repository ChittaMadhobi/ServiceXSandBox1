//import { TEST_DISPATCH } from '../actions/types';
//import { GET_ERRORS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// Depending on the action.type, the flow takes different path (switch)
export default function(state = initialState, action) {
  switch (action.type) {
    // case TEST_DISPATCH:
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // case GET_ERRORS:

    default:
      return state;
  }
}
