// This would validate registration data
const Validator = require('validator');

const isEmpty = require('./is-empty');

// Each biz-function will have its own validation: data is the input data for validation
module.exports = function validateRegisterInput(data) {
  //console.log('name : ' + data.name);
  let errors = {}; // set it up as empty object

  data.name = !isEmpty(data.name) ? data.name : ''; // Since validator does not work on string
  // if name is null or undefined ... turn it into empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''; //confirmed password

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is a required field';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is a required field';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is a required field';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 chars long';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is a required field';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors) // Is our empty check function
  };
};
