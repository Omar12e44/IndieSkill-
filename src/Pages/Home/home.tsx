import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, message, Button } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import axiosClient from "../../Services/api";
import "./Home.css";

const { Meta } = Card;

interface Creator {
  email: string;
  name: string;
  phone: string;
  address: string;
  skills: string;
  aptitudes: string;
  about: string;
  experience: string;
  positionsOffered: string;
}

interface JobOffer {
  id: string;
  title: string;
  description: string;
  userEmail: string;
  createdAt: string;
  categoryId: string;
  categoryName: string;
  creator: Creator;
}

const Home: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [isCreatorModalVisible, setIsCreatorModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");




  useEffect(() => {
    fetchJobOffers();
  }, []);

  const fetchJobOffers = async () => {
    try {
      const response = await axiosClient.get("/job-offers");
      setJobOffers(response.data);
    } catch (error) {
      console.error("Error al cargar los puestos ofrecidos:", error);
      message.error("Error al cargar los puestos ofrecidos.");
    }
  };

  const showLoginModal = () => {
    // Cerrar todas las modales antes de abrir login
    setIsJobModalVisible(false);
    setIsCreatorModalVisible(false);
    setIsLoginModalVisible(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalVisible(false);
  };

  const showRegisterModal = () => {
    // Cerrar todas las modales antes de abrir registro
    setIsJobModalVisible(false);
    setIsCreatorModalVisible(false);
    setIsRegisterModalVisible(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleJobClick = (job: JobOffer) => {
    // Cerrar otras modales antes de abrir detalles de trabajo
    setIsLoginModalVisible(false);
    setIsRegisterModalVisible(false);
    setIsCreatorModalVisible(false);
    
    setSelectedJob(job);
    setIsJobModalVisible(true);
  };

  const handleJobModalClose = () => {
    setIsJobModalVisible(false);
    setSelectedJob(null);
  };

  const handleCreatorClick = (job: JobOffer) => {
    // Cerrar otras modales antes de abrir detalles del creador
    setIsLoginModalVisible(false);
    setIsRegisterModalVisible(false);
    setIsJobModalVisible(false);
    
    setSelectedJob(job);
    setIsCreatorModalVisible(true);
  };

  const handleCreatorModalClose = () => {
    setIsCreatorModalVisible(false);
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase()); // Convertimos a minúsculas para evitar problemas de coincidencia
  };

  const filteredJobOffers = jobOffers.filter((job) =>
    job.title.toLowerCase().includes(searchTerm) ||
    job.description.toLowerCase().includes(searchTerm) ||
    job.categoryName.toLowerCase().includes(searchTerm) ||
    job.creator.name.toLowerCase().includes(searchTerm)
  );
  return (
    <div>
      <Navbar 
        onLoginClick={showLoginModal} 
        onRegisterClick={showRegisterModal} 
      />
      <Login 
        visible={isLoginModalVisible} 
        onClose={handleLoginModalClose} 
      />
      <Register 
        visible={isRegisterModalVisible} 
        onClose={handleRegisterModalClose} 
      />
      
      {/* Modal para detalles de la oferta */}
      <Modal
        title={selectedJob?.title}
        visible={isJobModalVisible}
        onCancel={handleJobModalClose}
        footer={null}
        className="job-details-modal"
        maskClosable={true}
      >
        <p><strong>Freelancer:</strong> {selectedJob?.creator.name}</p>
        <p><strong>Categoría:</strong> {selectedJob?.categoryName}</p>
        <p>{selectedJob?.description}</p>
        <Button type="link" onClick={() => handleCreatorClick(selectedJob!)}>
          Ver información del creador
        </Button>
      </Modal>

      {/* Modal para detalles del creador */}
      <Modal
        title="Información del Creador"
        visible={isCreatorModalVisible}
        onCancel={handleCreatorModalClose}
        footer={null}
        className="creator-details-modal"
        maskClosable={true}
      >
        <p><strong>Nombre:</strong> {selectedJob?.creator.name}</p>
        <p><strong>Email:</strong> {selectedJob?.creator.email}</p>
        <p><strong>Teléfono:</strong> {selectedJob?.creator.phone}</p>
        <p><strong>Dirección:</strong> {selectedJob?.creator.address}</p>
        <p><strong>Habilidades:</strong> {selectedJob?.creator.skills}</p>
        <p><strong>Aptitudes:</strong> {selectedJob?.creator.aptitudes}</p>
        <p><strong>Acerca de:</strong> {selectedJob?.creator.about}</p>
        <p><strong>Experiencia:</strong> {selectedJob?.creator.experience}</p>
        <p><strong>Puestos Ofrecidos:</strong> {selectedJob?.creator.positionsOffered}</p>
      </Modal>

      <div className="home-content">
        <div className="hero-section">
          <h1>
            Encuentra los mejores <span>Freelancers</span>
          </h1>
          <div className="search-bar">
          <input
              type="text"
              placeholder="Buscar puestos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />            <button>Buscar</button>
          </div>
        </div>
        <div className="job-offers-section">
        <div 
      className="title-container relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 
        className="text-4xl font-bold text-center py-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #004d40, #00695c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        Puestos ofrecidos
        
        {/* Hover Effect Layer */}
        <span 
          className={`absolute inset-0 transition-all duration-500 ease-in-out 
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
            bg-gradient-to-r from-[#004d40] to-[#00695c] bg-clip-text text-transparent`}
        >
        </span>
        
        {/* Underline Animation */}
        <span 
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#004d40] to-[#00695c] 
            transform origin-left transition-transform duration-500 ease-in-out 
            ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
        />
      </h2>
    </div>          <Row gutter={[16, 16]}>
            {filteredJobOffers.length > 0 ? (
              filteredJobOffers.map((job) => (
                <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    title={job.title}
                    onClick={() => setSelectedJob(job)}
                    className="job-card"
                  >
                    <Meta description={job.description} />
                    <p><strong>Freelancer:</strong> {job.creator.name}</p>
                    <p><strong>Categoría:</strong> {job.categoryName}</p>
                    <Button type="link" onClick={() => setSelectedJob(job)}>Ver información</Button>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No se encontraron resultados</p>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;