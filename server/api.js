var express = require('express');

var router = express.Router()
let user = require('./data')

// Add USERS Routes
router.use(user)

module.exports = router;