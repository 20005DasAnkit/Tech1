import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();                  // Clears token/session from context
    setShowDropdown(false);    // Close dropdown
    navigate('/');             // Redirect to home
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🛠️ <span>TechService</span>
      </div>

      {token && (
        <ul className="navbar-links">
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/technicians">Technicians</NavLink></li>

          {role !== 'admin' && (
            <>
              <li><NavLink to="/booking">Book Service</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><NavLink to="/store">Store</NavLink></li>
              <li><NavLink to="/cart">Cart</NavLink></li>
            </>
          )}

          {role === 'admin' && (
            <>
              <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
              <li><NavLink to="/admin/orders">Orders</NavLink></li>
              <li><NavLink to="/admin/queries">Contact Queries</NavLink></li>
            </>
          )}

          {/* Account Dropdown */}
          <li className="account-dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Account 
            </button>
            <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <li>
                <NavLink to="/profile" onClick={() => setShowDropdown(false)}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button className="logout-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;