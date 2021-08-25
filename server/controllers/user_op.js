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

    const user = await User.findOne({ username });
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
          message: 'You are authenticated',
          role: user.role,
          tokenExpiresIn: expiresIn,
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
        message: 'Sucessfully registered',
      });
    }
  } catch (err) {
    next(createError(500, 'Internal Server Error'));
  }
};

const logoutUser = (req, res, next) => {
  res.clearCookie('access_token');
  res.status(200).json({
    success: false,
    status: 200,
    message: 'successfully logout',
  });
};

module.exports = { loginUser, createUser, logoutUser };
