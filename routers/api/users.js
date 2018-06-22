const express = require('express');
const router = express.Router();
const gravatr = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load  input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load  User Model
const User = require('../../models/User');

// @route GET api/users/test
// @desc tests users routes
// @access Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users route works' });
});

// @route GET api/users/register
// @desc registering-users routes
// @access Public
router.post('/register', (req, res) => {
  //console.log('Register Router (req.body):' + JSON.stringify(req.body));
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation if input is right - if isValid is fales then there is a problem
  if (!isValid) {
    return res.status(400).json(errors); // in casse of error we want to send the status back with the error object
  }

  //console.log('Entered register post : ' + JSON.stringify(req.body));
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatr.url(req.body.email, {
        s: '200', // size of the picture
        r: 'pg', // rating .. no R rating
        d: 'mm' // default icon ... no picture available
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log('Error:' + err));
        });
      });
    }
  });
});

// @route   POST api/user/login
// @Desc    Login user / Returning JWT token
// @Access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation if input is right - if isValid is fales then there is a problem
  if (!isValid) {
    return res.status(400).json(errors); // in casse of error we want to send the status back with the error object
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = 'User not found!!!';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //generate token on user Match
        // Create a JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        ); // 3600 in seconds = 1 hour  -- should come from config
        //res.json({ msg: 'login success' });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc  Return current user. Not used in our application but can be used somewhere
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
      //msg: 'Success'
    });
  }
);

module.exports = router;
