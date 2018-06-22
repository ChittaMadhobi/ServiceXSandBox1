// These has validation for Experience entry rules
const Validator = require('validator');

const isEmpty = require('./is-empty');

// Each biz-function will have its own validation: data is the input data for validation
module.exports = function validateExperienceInput(data) {

  //console.log('email : ' + data.email + ' pwd: ' + data.password);
  let errors = {};  // set it up as empty object


  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is a required field';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company is a required field';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'Start-date, or from date, is a required field';
  }


  return {
    errors,
    isValid: isEmpty(errors)   // Is our empty check function 
  }
} 