const validator = require('validator');
const _ = require('lodash');

module.exports = function validateRegisterInput(data) {
    const errors = {};

    data.name = _.isEmpty(data.name) ? "" : data.name;
    data.email = _.isEmpty(data.email) ? "" : data.email;
    data.password = _.isEmpty(data.password) ? "" : data.password;
    data.password2 = _.isEmpty(data.password2) ? "" : data.password2;

    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if (!validator.isLength(data.name, {
            min: 2,
            max: 24
        })) {
        errors.name = 'Name must be in between 2 to 12 characters'

    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password is required";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is Invalid"
    }
    if (!validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "password must be atleast 6 characters"
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Password didn't match"
    }
    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}