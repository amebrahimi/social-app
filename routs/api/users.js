const express = require('express');
const router = express.Router();

// @rout    Get api/users/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

module.exports = router;