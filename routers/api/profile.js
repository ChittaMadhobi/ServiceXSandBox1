const express = require("express");
const router = express.Router();

// all routing would get prefixed by /api/profile
// all routing would get prefixed by /api/posts
// @route GET api/profile/test
// @desc tests profile routes
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile route works" });
});

module.exports = router;
