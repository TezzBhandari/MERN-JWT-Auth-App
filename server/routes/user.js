const router = require('express').Router();

const { loginUser } = require('../controllers/user_op');

router.post('/login', loginUser);

module.exports = router;
