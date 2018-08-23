const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secret = require('../../config/keys').Secret;

// Regsiter Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login.js');
// Load User Model
var User = require('../../models/User');

// @Route GET api/users/test
// @desc Test Users Route
// @acess Public
router.get('/test', (req, res) => {
    res.json({
        "message": "In users Routes"
    });
});


// @Route POST api/user
// @desc Create New User
// @access Public
router.post('/', (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // Validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then((user) => {
        console.log(user);
        if (user) {
            errors.email = "Email already exists";
            console.log(errors);
            return res.status(400).json(
                errors
            );
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        res.json(user);
                    }).catch((err) => {
                        console.log(err);
                    })
                })

            });
        }
    });
})


// @Route GET /api/users/login
// @desc Login User /Return JWT
// @access Public

router.post('/login', (req, res) => {

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find User by Email 

    User.findOne({
        email
    }).then((user) => {
        if (!user) {
            errors.email = "Email Not Found";
            return res.status(404).json(
                errors
            );
        }

        // Check Password
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                // User Matched
                // creating payload

                const payload = {
                    id: user._id,
                    name: user.name,
                    avatar: user.avatar
                };

                // Sign Token
                jwt.sign(payload, secret, {
                    expiresIn: 3600
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                    })
                });
            } else {
                errors.password = "Password is Incorrect";
                return res.status(400).json(
                    errors
                )
            }
        }).catch((err) => res.status(400).json(err));   

    })
});


// @Route GET /api/users/
// @desc Return Current User
// @Access Private

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
})

module.exports = router;