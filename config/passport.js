const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const secret = require('../config/keys').Secret;

const opts = {

};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then((user) => {
            if(user){
                return done(null,user);
            }
            return(null,false);
        }).catch((err) => console.log(err));
    }))
}