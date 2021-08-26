import React, { useState } from 'react';
import './Form.css';

import { login } from '../services/AuthService';
import { useGlobalContext } from '../context/GlobalAuthContext';
import Message from './Message';

function Login(props) {
  const { user, setAuthenticated, setUser } = useGlobalContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await login({ username, password });
    setUsername('');
    setPassword('');
    if (data.success && data.isAuthenticated) {
      setUser(data.user);
      setAuthenticated(data.isAuthenticated);
      console.log(user);
      props.history.push('/todos');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={submitHandler}>
        <h2 className='form-title'>Login</h2>
        {message && <Message message={message} />}
        <div className='form-input'>
          <input
            type='text'
            placeholder='Username'
            className='text-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
          />
          <input
            type='password'
            placeholder='password'
            className='text-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
          <button className='btn login-btn'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
