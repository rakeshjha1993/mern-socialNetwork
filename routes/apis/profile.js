const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();



// @Route GET api/profiles/test
// @desc Test Profile Route
// @acess Public
router.get('/test', (req, res) => {
    res.json({
        "message": "In profile Routes"
    });
});

// @Route GET api/profiles
// @desc Current User Profile
// @access Private

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id}).then(profile => {
        if(!profile){
            errors.profile = "No Profile Found";
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.json(err));
});

// @Route POST api/profiles
// @desc Create profile
// @access Private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    
})


module.exports = router;