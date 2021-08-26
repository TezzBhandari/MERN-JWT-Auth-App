import React, { useState, useEffect, useContext } from 'react';

import { getTodos } from '../services/TodoService';

const TodoContext = React.createContext();

function GlobalTodosContext({ children }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        setTodos(data.todos);
      } catch (err) {
        console.log(err.response.data);
        return { todos: [] };
      }
    };
    fetchData();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos, isLoading, setIsLoading }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export default GlobalTodosContext;
