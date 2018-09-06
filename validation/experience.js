const validator = require('validator');
const _ = require('lodash');

module.exports = function validateExperienceInput(data) {
    const errors = {};

    data.title = _.isEmpty(data.title) ? "" : data.title;
    data.company = _.isEmpty(data.company) ? "" : data.company;
    data.location = _.isEmpty(data.location) ? "" : data.location;
  
    data.description = _.isEmpty(data.description) ? "" : data.description;

    if (validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }
    if (validator.isEmpty(data.company)) {
        console.log(`comapny : ${data.company}`)
        errors.company = "Company is required";
    }
    if (validator.isEmpty(data.from)) {
        errors.email = "Date from is required";
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}