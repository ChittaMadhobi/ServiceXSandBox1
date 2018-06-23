import { GET_ERRORS } from '../actions/types';

const initialState = {};

// Depending on the action.type, the flow takes different path (switch)
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // console.log(
      //   'In switch GET_ERRORS (errorReducer.js) : ' +
      //     JSON.stringify(action.payload)
      // );
      return action.payload;

    default:
      return state;
  }
}
