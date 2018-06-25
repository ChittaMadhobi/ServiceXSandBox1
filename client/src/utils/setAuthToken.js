// We want to set a default header for axios. This function, when called,
// will attach the authorization to the header (if logged in)
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
