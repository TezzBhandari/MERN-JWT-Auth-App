import React, { useState, useRef, useEffect } from 'react';
import './Form.css';

import { register } from '../services/AuthService';
import Message from './Message';

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(null);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();
    const data = await register({ username, password, role: 'user' });
    const { message } = data;
    setMessage(message);
    setUsername('');
    setPassword('');
    if (!message.isError) {
      timerID = setTimeout(() => {
        props.history.push('/login');
      }, 2000);
    }
  };

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={registerHandler}>
        <h2 className='form-title'>Registration</h2>
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
          {/* <select name="" id="">
            <option value="user"></option>
            <option value="admin"></option>
          </select> */}
          <button className='btn register-btn'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
