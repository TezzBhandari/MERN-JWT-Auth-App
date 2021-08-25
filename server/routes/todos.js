const router = require('express').Router();

const { addTodos, getTodos } = require('../controllers/todo_op');

router.route('/').post(addTodos).get(getTodos);

module.exports = router;
