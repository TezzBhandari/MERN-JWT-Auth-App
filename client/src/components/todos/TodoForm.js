import React, { useState } from 'react';
import { useTodoContext } from '../../context/GlobalTodosContext';
import { getTodos, postTodo } from '../../services/TodoService';

function TodoForm() {
  const { setTodos } = useTodoContext();
  const [title, setTitle] = useState('');

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const postRes = await postTodo({ title });
      if (postRes.success) {
        const data = await getTodos();
        if (data.success) {
          setTodos(data.todos);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setTitle('');
  };
  return (
    <form className='form task-form' onSubmit={submitHandler}>
      <h4 className='title'>Task Manager</h4>
      <div className='form-control'>
        <input
          type='text'
          className='form-input task-input'
          placeholder='e.g, wash your dog'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button className='btn task-btn'>submit</button>
      </div>
      {/* <Modal /> */}
    </form>
  );
}

export default TodoForm;
