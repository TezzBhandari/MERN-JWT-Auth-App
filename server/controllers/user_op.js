const createError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Todos = require('../models/Todo');
const { issueJWT } = require('../middlewares/auth');

// Request Handler For User Login
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next(createError(400, 'Empty Field'));
    }

    const user = await User.findOne({ username }).populate('todos');
    if (!user) {
      next(createError(400, 'No Such User Exist'));
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        next(createError('Wrong Password'));
      } else {
        const { token, expiresIn } = issueJWT(user);
        res.cookie('access_token', token, {
          httpOnly: true,
          sameSite: true,
          secure: false,
          maxAge: Date.now() + 60000,
        });
        res.status(200).json({
          success: true,
          isAuthenticated: true,
          message: { isError: false, msgBody: 'Successfully Logged In' },
          user,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      next(createError(400, 'Empty Field'));
    }

    const user = await User.findOne({ username });
    if (user) {
      next(createError(400, 'User Already Exist'));
    } else {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hash, role });
      res.status(200).json({
        success: true,
        status: 200,
        message: { isError: false, msgBody: 'Successfully Registered' },
      });
    }
  } catch (err) {
    next(createError(500, 'Internal Server Error'));
  }
};

const logoutUser = (req, res, next) => {
  res.clearCookie('access_token');
  res.status(200).json({
    success: true,
    status: 200,
    user: { username: '', role: '' },
    message: 'successfully logout',
  });
};

const isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.sub }).populate('todos');
    res.status(200).json({
      success: true,
      status: 200,
      isAuthenticated: true,
      user,
    });
  } catch (err) {
    next(createError(500, 'Internal Server Error'));
  }
};

module.exports = { loginUser, createUser, logoutUser, isAuthenticated };
