import React from 'react';
import { useTodoContext } from '../../context/GlobalTodosContext';
import './Todos.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function Todos() {
  const { isLoading } = useTodoContext();
  return (
    <>
      <TodoForm />
      {isLoading ? (
        <div className='todo-loading-container'>
          <h1>Loading....</h1>
        </div>
      ) : (
        <section className='task-container'>
          <TodoList />
        </section>
      )}
    </>
  );
}

export default Todos;
