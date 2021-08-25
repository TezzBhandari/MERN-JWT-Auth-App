const router = require('express').Router();

const userRoute = require('./user');
const todosRoute = require('./todos');
const { auth } = require('../middlewares/auth');

router.get('/protected', auth, (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Protected info',
    user: req.user,
  });
});

// User Routes
router.use('/user', userRoute);

// Todos Routes
router.use('/todos', auth, todosRoute);

module.exports = router;
