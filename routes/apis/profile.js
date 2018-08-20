const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @Route GET api/profiles/test
// @desc Test Profile Route
// @acess Public
router.get("/test", (req, res) => {
    res.json({
        message: "In profile Routes"
    });
});

// @Route GET api/profiles
// @desc Current User Profile
// @access Private

router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const errors = {};

        Profile.findOne({
                user: req.user.id
            })
            .then(profile => {
                if (!profile) {
                    errors.profile = "No Profile Found";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.json(err));
    }
);

// @Route POST api/profiles
// @desc Create profile
// @access Private

router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        //Get Fields
        const profileFields = {};
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.comapny = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.status) profileFields.status = req.body.status;
        if (typeof req.body.skills !== "undefined") {
            profileFields.skills = req.body.skills.split(",");
        }

        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;
        if (req.body.experience) profileFields.experience = req.body.experience;
        if (req.body.education) profileFields.education = req.body.education;

        // Assigning social Object
        profileFields.social = {};
        if (req.body.social.youtube)
            profileFields.social.youtube = req.body.social.youtube;
        if (req.body.social.facebook)
            profileFields.social.facebook = req.body.social.facebook;
        if (req.body.social.twitter)
            profileFields.social.twitter = req.body.social.twitter;
        if (req.body.social.instagram)
            profileFields.social.instagram = req.body.social.instagram;
        if (req.body.social.linkedin)
            profileFields.social.linkedin = req.body.social.linkedin;

        Profile.findOne({
                user: req.user.id
            })
            .then(profile => {
                if (profile) {
                    console.log(profile);
                    // Update
                    return Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    });
                } else {
                    // Create New Profile

                    return Profile.findOne({
                        handle: profileFields.handle
                    });
                }
            })
            .then(profile => {
                console.log(profile);
                if (profile) {
                    res.json(profile);
                }
                new Profile(profileFields).save().then(profile => {
                    res.json(profile);
                });
            })
            .catch(err => res.status(500).json(err));
    }
);

// @Route GET api/profiles/handle/:handle
// @desc Fetch user from handle
// @access Public

router.get("/handle/:handle", (req, res) => {
    const errors = {};
    Profile.findOne({
            handle: req.params.handle
        })
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(400).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

// @Route GET api/profiles/user/:user_id
// @desc Fetch user from handle
// @access Public

router.get("/user/:user_id", (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.params.user_id
        })
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            return res.status(404).json(err);
        });
});

// @Route GET api/profiles/all/
// @desc Fetch all users profile
// @access Public

router.get("/all", (req, res) => {
    Profile.find({})
        .populate("user", ["name", "avatar"])
        .then(profiles => {
            if (!profiles) {
                errors.profiles = "Profiles not Found";
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(error => res.status(404).json(error));
});

// @Route POST /api/profiles/experience
// @desc Add experience to user profile
// @access Private

router.post(
    "/experience",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log(req.body);
        const {
            Errors,
            isValid
        } = validateExperienceInput(req.body);

        if (!isValid) {
            return res.status(400).json(Errors);
        }
        Profile.findOne({
            user: req.user.id
        }).then((profile) => {
            const experienceFields = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add experience to array

            profile.experience.unshift(experienceFields);
            // console.log(profile.experience);
            profile.save().then((profile => {
                if (!profile) {
                    return res.status(400).json({
                        error: "Profile not updated"
                    });
                }
                res.json(profile);
            })).catch(err => {
                return res.status(400).json({
                    errors: err
                });
            });
        }).catch(err => res.json(err));

    }
);


// @Route POST /api/profiles/education
// @desc Add education to user profile
// @access Private

router.post(
    "/education",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const {
            errors,
            isValid
        } = validateEducationInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        };
        console.log(req.user.id);
        Profile.findOne({user:req.user.id}).then(profile => {
            console.log(req.user.id);
            const educationFields = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            if(!profile){
                errors.profile = "Profile Not Found";
                return res.status(400).json(errors);
            }

            profile.education.unshift(educationFields);
            profile.save().then((profile)=> {
                if(!profile){
                    errors.profile = "Profile Not Found";
                    return res.status(400).json(errors);
                }
                res.json(profile);
            });
        }).catch(err => res.status(500).json(err));
    }
);

// @Route DELETE /api/profiles/delete/:exp_id
// @desc delete experience from user profile
// @access Private

router.delete('/delete/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res) => {
    const errors = {};
    Profile.findOne({user:req.user.id}).then( (profile) => {
        if(!profile){
            errors.profileNotFound = "Profile not found";
            return res.status(400).json(errors);
        }
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        profile.save().then((profile) => res.json(profile) );
    }).catch(err => res.status(500).json(err));
});


// @Route DELETE /api/profiles/delete/:education_id
// @desc delete Education from user profile
// @access Private

router.delete('/delete/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res) => {
    const errors = {};
    Profile.findOne({user:req.user.id}).then( (profile) => {
        if(!profile){
            errors.profileNotFound = "Profile not found";
            return res.status(400).json(errors);
        }
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        profile.save().then((profile) => res.json(profile) );
    }).catch(err => res.status(400).json(err));
});


// @Route DELETE /api/profiles/
// @desc delete user and profile
// @access Private


router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Profile.findOneAndRemove({user:req.user.id}).then(() => {
        User.findByIdAndRemove({_id:req.user.id}).then( () => res.json({success : "profile and user deleted successfully"}));
    }).catch(err => res.status(500).json(err));
});

module.exports = router;