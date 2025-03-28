import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button  } from 'antd';
import './Navbar.css';

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('email'));

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setUserEmail(storedEmail);
  }
  , []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUserEmail(null);
  };






  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">LOGO</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/perfil">Perfil</Link>
        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <Link to="/option1">Option 1</Link>
            <Link to="/option2">Option 2</Link>
            <Link to="/option3">Option 3</Link>
          </div>
        </div>

        {/* Mostrar botones según estado de autenticación */}
        {userEmail ? (
          <>
            <Button color= "red" variant = "solid" className="logout-btn" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <button className="join-btn" onClick={onRegisterClick}>JOIN</button>
            <button className="login-btn" onClick={onLoginClick}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;