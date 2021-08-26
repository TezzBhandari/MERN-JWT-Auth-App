import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function UnAuthenticatedNavbar() {
  return (
    <>
      <Redirect to='/login' />
      {/* Redirects To Login Page If You Are Not LoggedIn or Authorized */}
      <li>
        <Link to='/' className='link'>
          Home
        </Link>
      </li>
      <li>
        <Link to='/register' className='link'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' className='link'>
          Login
        </Link>
      </li>
    </>
  );
}

export default UnAuthenticatedNavbar;
