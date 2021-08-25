const mongoose = require('mongoose');
const Todo = require('./Todo');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 15,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: Todo }],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
