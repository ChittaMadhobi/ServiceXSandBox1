const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// Validator files inport
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/
// @desc    Get post list
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (!posts) {
        errors.posts = "There are no posts to be listed";
        return res.status(400).json(errors);
      }
      res.json(posts)
    })
    .catch(err => res.status(404).json(err));

})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        errors.posts = "There is no post for the id: " + req.params.id;
        return res.status(400).json(errors);
      }
      res.json(post);
    })
    .catch(err => res.status(404).json(err));

})

// @route POST api/posts/test
// @desc  Creates post
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  // Check Validation
  if (!isValid) {
    // if any errors .. send status 400 with errors
    return res.status(400).json(errors);
  }
  //console.log('req.body : ' + JSON.stringify(req.body));
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post))
    .catch(err => res.status(403).json({ err }));
})

// @route   DELETE api/posts/:id
// @desc    Deletes a post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //console.log('post.user.toString : ' + post.user.toString() + ' req.user.id:' + req.user.id);
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' });
          }
          //
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(403).json({ err }));
    })
    .catch(err => res.status(403).json({ err }));
  //.catch(err => res.status(403).json({ err }));
});

// @route   POST api/posts/like/:id
// @desc    Mark the like  post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // We will use filter to see if the user has already liked. 
          // If the  array formed is > 0 means it already exists
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already likeds this post' });
          }
          // Add user id to likes
          post.likes.unshift({ user: req.user.id });  // Pushed but not yet save in DB
          post.save()
            .then(post => res.json(post));           // Saved in DB. Return the post.
        })
        .catch(err => res.status(403).json({ err }));
    })
    .catch(err => res.status(403).json({ err }));
  //.catch(err => res.status(403).json({ err }));
});

// @route   POST api/posts/unlike/:id
// @desc    Un-Mark the like post (or delete the user from the likes)
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // We will use filter to see if the user has already liked. 
          // If the  array formed is > 0 means it already exists
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not liked this post' });
          }
          // Get the remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);  // We get the index of the user we would like to remove from the likes array
          // Splice it out of the array
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));

        })
        .catch(err => res.status(403).json({ err }));
    })
    .catch(err => res.status(403).json({ err }));
  //.catch(err => res.status(403).json({ err }));
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post with post_id
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);
  // Check Validation
  if (!isValid) {
    // if any errors .. send status 400 with errors
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // Add to comments array
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));

    })
    .catch(err => res.status(403).json({ err }));

});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment to post with post_id and a comment in that with comment_id
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {


  Post.findById(req.params.id)
    .then(post => {

      // if  the  comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' });
      }

      // Get the remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice it out of the array at the index
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(403).json({ err }));

});

module.exports = router;
