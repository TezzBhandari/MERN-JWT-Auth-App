const User = require('../models/user');

// Request Handler For User Login
const loginUser = async (req, res, next) => {
  try {
    res.json({
      message: 'comming soon',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { loginUser };
