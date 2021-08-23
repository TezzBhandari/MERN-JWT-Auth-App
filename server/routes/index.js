const router = require('express').Router();

const userRoute = require('./user');

// User Routes
router.use('/user', userRoute);

module.exports = router;
