import React from 'react';
import { Link } from 'react-router-dom';

function UnAuthenticatedNavbar() {
  return (
    <>
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
