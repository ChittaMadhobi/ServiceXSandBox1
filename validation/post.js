// These has validation for login rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

// Each biz-function will have its own validation: data is the input data for validation
module.exports = function validatePostInput(data) {

  //console.log('email : ' + data.email + ' pwd: ' + data.password);
  let errors = {};  // set it up as empty object


  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Text should be between 10 to 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is a required field';
  }

  return {
    errors,
    isValid: isEmpty(errors)   // Is our empty check function 
  }
} 