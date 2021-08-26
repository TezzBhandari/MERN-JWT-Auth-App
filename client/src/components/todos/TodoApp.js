import React from 'react';
import GlobalTodosContext from '../../context/GlobalTodosContext';
import Todos from './Todos';

function TodoApp() {
  return (
    <GlobalTodosContext>
      <Todos />
    </GlobalTodosContext>
  );
}

export default TodoApp;
