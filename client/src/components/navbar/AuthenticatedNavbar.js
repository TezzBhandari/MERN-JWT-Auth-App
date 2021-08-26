import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalAuthContext';
import { logout } from '../../services/AuthService';

function AuthenticatedNavbar() {
  const { user, setUser, setAuthenticated } = useGlobalContext();

  const logoutHandler = async () => {
    try {
      alert('You are logging out');
      const data = await logout();
      if (data.success) {
        setUser(data.user);
        setAuthenticated(false);
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
        <button className='link logout-btn' onClick={logoutHandler}>
          logout
        </button>
      </li>
    </>
  );
}

export default AuthenticatedNavbar;
