import React, { useState } from 'react';

import PublicNavbar from './PublicNavbar';
import ProtectedNavbar from './ProtectedNavbar';

import './navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  return isAuthenticated ? <ProtectedNavbar /> : <PublicNavbar />;
};

export default Navbar;
