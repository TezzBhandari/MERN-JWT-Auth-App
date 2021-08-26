const router = require('express').Router();

const { auth } = require('../middlewares/auth');

const {
  loginUser,
  createUser,
  logoutUser,
  isAuthenticated,
} = require('../controllers/user_op');

router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/logout', auth, logoutUser);
router.get('/authenticate', auth, isAuthenticated);

module.exports = router;
