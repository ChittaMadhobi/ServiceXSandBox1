// These has validation for Experience entry rules
const Validator = require('validator');

const isEmpty = require('./is-empty');

// Each biz-function will have its own validation: data is the input data for validation
module.exports = function validateExperienceInput(data) {

  //console.log('email : ' + data.email + ' pwd: ' + data.password);
  let errors = {};  // set it up as empty object


  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (Validator.isEmpty(data.school)) {
    errors.school = 'School is a required field';
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree is a required field';
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is a required field';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'Start-date, or from date, is a required field';
  }


  return {
    errors,
    isValid: isEmpty(errors)   // Is our empty check function 
  }
} 