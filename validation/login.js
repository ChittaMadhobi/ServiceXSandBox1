// These has validation for login rules
const Validator = require('validator');

const isEmpty = require('./is-empty');

// Each biz-function will have its own validation: data is the input data for validation
module.exports = function validateLoginInput(data) {

  //console.log('email : ' + data.email + ' pwd: ' + data.password);
  let errors = {};  // set it up as empty object


  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is a required field';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is a required field';
  }

  return {
    errors,
    isValid: isEmpty(errors)   // Is our empty check function 
  }
} 