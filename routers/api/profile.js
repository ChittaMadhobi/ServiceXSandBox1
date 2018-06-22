const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

// Load Validator
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route GET api/profile/test
// @desc tests profile routes
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile route works" });
});

// @route GET api/profile
// @desc  get profile of the logged in user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json({ errors });
      }
      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));

});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There is no profile in DB.'
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(403).json({ err }));

})


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile for this user.'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(403).json({ err }));

})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by handle
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile for this user.'
        return res.status(404).json(errors);
      }
      res.json(profile);

    })
    .catch(err => res.status(403).json({ profile: 'Invalid user_id specification or system error' }));

})

// @route POST api/profile
// @desc  Create or edit user's profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateProfileInput(req.body);
  // Check
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields from req.body
  const profileFields = {};
  // The user will be picked up from logged in user (user id, email, avatar)
  profileFields.user = req.user.id; // Check how user is available via passport or something like that
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githuusername) profileFields.githuusername = req.body.githuusername;
  // Skills - Split into an array
  if (typeof req.body.skills !== 'undefined') {
    let preTrimVar = req.body.skills.split(','); // convert , separated input into an array
    // Trim any spaces around  commas
    profileFields.skills = preTrimVar.map(function (s) { return String.prototype.trim.apply(s); });
  }
  // Social  
  profileFields.social = {}; // Since social is an object in DB, If we do not define object, it will say 'profileFields.social' does not exist
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instaram) profileFields.social.instaram = req.body.instaram;

  // Save  or (if profile exists) update in DB
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // check if handle exists (handle is for SCO in a friendly way)
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              return res.status(400).json(errors);
            }
            // Save
            new Profile(profileFields).save()
              .then(profile => res.json(profile)); // save gives a promise; gives the profile back ... and  we send it back
          })
      }
    })
    .catch(err => res.status(404).json(err));  // This one I have added cause it should be there
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateExperienceInput(req.body);
  // Check
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // Add to experience array (instead of 'push' we use 'unshift' to append in the beginning of  the array)
      profile.experience.unshift(newExp);
      profile.save()
        .then(profile => res.json(profile));

    })
    .catch(err => res.status(404).json(err));
})

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateEducationInput(req.body);
  // Check
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // Add to experience array (instead of 'push' we use 'unshift' to append in the beginning of  the array)
      profile.education.unshift(newEdu);
      profile.save()
        .then(profile => res.json(profile));

    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience to profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {


  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      // splice out the array 
      profile.experience.splice(removeIndex, 1);
      // save the rest of the profile back.
      profile.save()
        .then(profile => res.json(profile));

    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education to profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {


  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      // splice out the array 
      profile.education.splice(removeIndex, 1);
      // save the rest of the profile back.
      profile.save()
        .then(profile => res.json(profile));

    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {


  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
          User.findOneAndRemove({ _id: req.user.id })      // Sice this is from Users colleciton
            .then(() => res.json({ SUCCESS: true }))
        })
    })
    .catch(err => res.status(404).json(err));
})


module.exports = router;
