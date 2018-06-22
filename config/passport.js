const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);  // parm1 is error which is null, 
          }
          return done(null, false); // error is null because it is not error but ... not right user
        })
        .catch(err => {
          console.log('System Error - JwtStrategy passport.js : ' + err);
        })
      //console.log(jwt_payload);
    })
  );
};
