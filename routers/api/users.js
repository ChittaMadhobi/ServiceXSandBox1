const express = require("express");
const router = express.Router();

// all routing would get prefixed by /api/users
// all routing would get prefixed by /api/posts
// @route GET api/users/test
// @desc tests users routes
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users route works" });
});

module.exports = router;
