const validator = require('validator');
const _ = require('lodash');

module.exports = function validateEducationInput(data) {
    const errors = {};

    data.school = _.isEmpty(data.school) ? "" : data.school;
    data.degree = _.isEmpty(data.degree) ? "" : data.degree;
    data.fieldOfStudy = _.isEmpty(data.fieldOfStudy) ? "" : data.fieldOfStudy;
    data.from = _.isEmpty(data.from) ? "" : data.from;
    data.to = _.isEmpty(data.to) ? "" : data.from;
    data.description = _.isEmpty(data.description) ? "" : data.description;

    if (validator.isEmpty(data.school)) {
        errors.title = "Title is required";
    }
    if (validator.isEmpty(data.degree)) {
        errors.company = "Company is required";
    }
    if (validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = "Company is required";
    }
    if (validator.isEmpty(data.from)) {
        errors.email = "Date from is required";
    }
    if (validator.isEmpty(data.to)) {
        errors.to = "Date from is required";
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}