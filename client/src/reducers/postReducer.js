// Step 3: import ADD_POST
import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING
} from '../actions/types';

//Step 1:  In any reducer, we start with the initial state
const initialState = {
  posts: [],
  post: {},
  loading: false
};

// Step 2: Export the function with initialState and actions. Actions are
//         defined in .../actions/types.js
// Step 4: include case ADD_POST. return action.payoload (the text) and augment
//         that to existing posts via ...state.posts
export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    default:
      return state;
  }
}
