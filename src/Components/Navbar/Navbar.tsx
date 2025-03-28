import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button  } from 'antd';
import { LogoutOutlined, HomeOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'; // Importar iconos

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
    window.location.reload(); // Recargar la página para reflejar el cambio de estado
    window.location.href = '/'; // Redirigir a /home

  };






  return (
    <nav className="navbar">
  <div className="navbar-logo">
  <Link to="/">
    <span className="logo-text">IndieSkill</span>
  </Link>
</div>
      <div className="navbar-links">
      <Link to="/">
          <HomeOutlined /> Home
        </Link>
        <Link to="/perfil">
          <UserOutlined /> Perfil
        </Link>
        <Link to="/contacto">
          <MailOutlined /> Contacto
        </Link>


        {/* Mostrar botones según estado de autenticación */}
        {userEmail ? (
          <>
   <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
          >
            Logout
          </Button>          </>
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