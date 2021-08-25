import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalAuthContext';
import { logout } from '../../services/AuthService';

function UnAuthenticatedNavbar() {
  const { user, setUser, setAuthenticated } = useGlobalContext();

  const logoutHandler = async () => {
    try {
      const data = await logout();
      console.log('data', data);
      if (data.success) {
        setUser(data.user);
        setAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <li>
        <Link to='/' className='link'>
          Home
        </Link>
      </li>
      <li>
        <Link to='/todos' className='link'>
          Todos
        </Link>
      </li>
      {user.role === 'admin' && (
        <li>
          <Link to='/admin' className='link'>
            Admin
          </Link>
        </li>
      )}
      <li>
        <button className='btn logout-btn' onClick={logoutHandler}>
          logout
        </button>
      </li>
    </>
  );
}

export default UnAuthenticatedNavbar;
