import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

const Logo = ({ size = "50px", className = "" }) => (
  <img 
    src={logo}
    alt="Application Logo"
    width={size}
    className={`h-auto ${className}`}
    loading="lazy"
  />
);

Logo.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string
};

export default Logo;