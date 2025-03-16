import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">LOGO</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/link">Perfil</Link>
        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <Link to="/option1">Option 1</Link>
            <Link to="/option2">Option 2</Link>
            <Link to="/option3">Option 3</Link>
          </div>
        </div>
        <button className="join-btn" onClick={onRegisterClick}>JOIN</button>
        <button className="login-btn" onClick={onLoginClick}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;