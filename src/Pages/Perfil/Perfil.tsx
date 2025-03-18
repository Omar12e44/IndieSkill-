import React from 'react';
import { useState } from 'react';
import './Perfil.css';
import Navbar from '../../Components/Navbar/Navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Perfil: React.FC = () => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
      const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    
      const showLoginModal = () => {
        setIsLoginModalVisible(true);
      };
    
      const handleLoginModalClose = () => {
        setIsLoginModalVisible(false);
      };
    
      const showRegisterModal = () => {
        setIsRegisterModalVisible(true);
      };
    
      const handleRegisterModalClose = () => {
        setIsRegisterModalVisible(false);
      };
    
  return (
    <div>
     <Navbar onLoginClick={showLoginModal} onRegisterClick={showRegisterModal} />
      <Login visible={isLoginModalVisible} onClose={handleLoginModalClose} />
      <Register visible={isRegisterModalVisible} onClose={handleRegisterModalClose} />
    <div className="perfil-container">
      <main className="perfil-main">
        <div className="perfil-card">
          <div className="perfil-photo"></div>
          <h1>Omar Basaldúa Gonzalez</h1>
          <p>omarbasal18@gmail.com</p>
          <div className="perfil-info">
            <p><span>📍</span> Located in Mexico</p>
            <p><span>📅</span> Joined in 2025</p>
            <p><span>🏫</span> Address UTEQ</p>
          </div>
          <div className="perfil-about">
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </main>
      <footer className="perfil-footer">
        <button className="contact-button">Contact</button>
      </footer>
    </div>
    </div>
  );
};

export default Perfil;