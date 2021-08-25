import React from 'react';

import './Navbar.css';
import { useGlobalContext } from '../../context/GlobalAuthContext';
import UnAuthenticatedNavbar from './UnAuthenticatedNavbar';
import AuthenticatedNavbar from './AuthenticatedNavbar';

function Navbar() {
  const { authenticated } = useGlobalContext();

  return (
    <header className='header'>
      <div className='logo-container'>
        <a to='/' className='logo'>
          JWT App
        </a>
      </div>
      <nav className='nav-container'>
        <ul className='nav-links'>
          {authenticated ? <AuthenticatedNavbar /> : <UnAuthenticatedNavbar />}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
