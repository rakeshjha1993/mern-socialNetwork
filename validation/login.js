const validator = require('validator');
const _ = require('lodash');

module.exports = function validateLoginInput(data) {
    const errors = {};

    data.email = _.isEmpty(data.email) ? "" : data.email;
    data.password = _.isEmpty(data.password) ? "" : data.password;
    data.password2 = _.isEmpty(data.password2) ? "" : data.password2;


    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is Invalid"
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}