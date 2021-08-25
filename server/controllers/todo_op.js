const Todo = require('../models/Todo');
const User = require('../models/User');
const createError = require('http-errors');

const addTodos = async (req, res, next) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    const user = await User.findByIdAndUpdate(
      req.user.sub,
      {
        $push: { todos: todo._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully Added The Todos',
      todo,
      user,
    });
  } catch (err) {
    next(createError(500, 'Internal Server Error'));
  }
};

const getTodos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub).populate('todos').exec();
    res.status(200).json({
      success: true,
      status: 200,
      user: user.username,
      todos: user.todos,
    });
  } catch (err) {
    console.log(err);
    next(createError(500, 'Internal Server Error'));
  }
};

module.exports = {
  addTodos,
  getTodos,
};
