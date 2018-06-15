const express = require("express");
const router = express.Router();

// all routing would get prefixed by /api/posts
// @route GET api/posts/test
// @desc tests post routes
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts route works" });
});

module.exports = router;
