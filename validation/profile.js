// These has validation for profile rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

// Each biz-function will have its own validation: data is the input data for validation
module.exports = function validateProfileInput(data) {

  //console.log('email : ' + data.email + ' pwd: ' + data.password);
  let errors = {};  // set it up as empty object


  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handles needs to be between 2 to 40 characters";
  }
  // I think ... this is what it should be 
  // if (isEmpty(data.handle)) {
  //   errors.handle = 'Profile Handle is  required';
  // }
  // We should not be using Validator's isEmpty ... right?
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile Handle is  required';
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Profile status is  required';
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills filed is  required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Invalid website URL';
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Invalid youtube URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Invalid facebook URL';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Invalid linkedin URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Invalid website URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Invalid website URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)   // Is our empty check function 
  }
} 