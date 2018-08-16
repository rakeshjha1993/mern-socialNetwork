const validator = require('validator');
const _ = require('lodash');

module.exports = function validateProfileInput(data) {
    const errors = {};
    console.log(data);
    data.handle = _.isEmpty(data.handle) ? "" : data.handle;
    data.skills = _.isEmpty(data.skills) ? "" : data.skills;
    data.status = _.isEmpty(data.status) ? "" : data.status;


    if (validator.isEmpty(data.handle)) {
        errors.handle = "Handle is required";
    }
    if (validator.isEmpty(data.status)) {
        errors.status = "status is required";
    }
    if (validator.isEmpty(data.skills)) {
        errors.skills = "skills is Required";
    }
    if (!validator.isLength(data.handle, {min:5,max:16})) {
        errors.handle = "Enter valid Handle";
    }
    if(!_.isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = "Enter Valid Url";
        }
    }
    if(!_.isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = "Enter Valid Url";
        }
    }
    if(!_.isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = "Enter Valid Url";
        }
    }
    if(!_.isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = "Enter Valid Url";
        }
    }
    if(!_.isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin )){
            errors.linkedin = "Enter Valid Url";
        }
    }
    if(!_.isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = "Enter Valid Url";
        }
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}