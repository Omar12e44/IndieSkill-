import React, { useState } from 'react';
import { Modal } from 'antd';
import Navbar from '../../Components/Navbar/Navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './home.css';

const Home: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const showCategoryModal = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryModalVisible(true);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <Navbar onLoginClick={showLoginModal} onRegisterClick={showRegisterModal} />
      <Login visible={isLoginModalVisible} onClose={handleLoginModalClose} />
      <Register visible={isRegisterModalVisible} onClose={handleRegisterModalClose} />
      <Modal
        title={selectedCategory}
        visible={isCategoryModalVisible}
        onCancel={handleCategoryModalClose}
        footer={null}
      >
        <p>Información detallada sobre {selectedCategory}.</p>
      </Modal>
      <div className="home-content">
        <div className="hero-section">
          <h1>professional <span>freelancers</span></h1>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
        </div>
        <div className="categories-section">
          <h2>Categories</h2>
          <div className="categories">
            <div className="category" onClick={() => showCategoryModal('Programming')}>
              <h3>Programming</h3>
              <p>Ver mas</p>
            </div>
            <div className="category" onClick={() => showCategoryModal('Graphic Design')}>
              <h3>Graphic Design</h3>
              <p>Ver mas</p>
            </div>
            <div className="category" onClick={() => showCategoryModal('Marketing')}>
              <h3>Marketing</h3>
              <p>Ver mas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;