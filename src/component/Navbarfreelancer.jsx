import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt, faComments, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './../css/componentCss/Navbarfreelancer.css'; // Ensure this path is correct
import profile from './../images/profile.png';

const Navbarfreelancer = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleServicesToggle = () => {
    setServicesOpen(!servicesOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'show' : ''}`}>
      <div className="logo">RojgarNepal</div>
      <div className="menu-toggle" id="mobile-menu" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
      </div>
  
      <div className="navbar-search">
        <input type="text" placeholder="Search Jobs..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className="navbar-icons">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faComments} className="icon" />
          <div className="notification-bubble">3</div>
        </div>
        <div className="profile-icon">
          <img src={profile} alt="Profile" />
        </div>
        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
      </div>
    </nav>
  );
};

export default Navbarfreelancer;
