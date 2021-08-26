import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

import { FiEdit } from 'react-icons/fi';
import { useTodoContext } from '../../context/GlobalTodosContext';

function TodoList() {
  const { todos } = useTodoContext();
  return (
    <div className='tasks'>
      {todos.map((todo) => {
        return (
          <div className='single-task' key={todo._id}>
            <h5>
              <BsCheckCircle className='check-icon' />
              {todo.title}
            </h5>
            <div className='task-links'>
              <button className='edit-icon'>
                <FiEdit />
              </button>
              <button>
                <AiFillDelete className='delete-icon' />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
