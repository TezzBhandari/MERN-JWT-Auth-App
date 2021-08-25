const router = require('express').Router();

const { auth } = require('../middlewares/auth');

const { loginUser, createUser, logoutUser } = require('../controllers/user_op');

router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/logout', auth, logoutUser);

module.exports = router;
