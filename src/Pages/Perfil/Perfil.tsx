/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input, Button, message, Typography, Spin, Form, Modal, Select } from "antd";
const { Option } = Select;
import "./Perfil.css";
import Navbar from "../../Components/Navbar/Navbar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import axiosClient from "../../Services/api";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const Perfil: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null); // Estado para almacenar el perfil
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [saving, setSaving] = useState(false); // Estado para manejar el spinner al guardar
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [isEditing, setIsEditing] = useState(false); // Estado para manejar el modo de edición
  const [updatedProfile, setUpdatedProfile] = useState<any>({}); // Estado para almacenar los cambios
  const [isJobModalVisible, setIsJobModalVisible] = useState(false); // Estado del modal para crear oferta
const [jobTitle, setJobTitle] = useState<string>(""); // Título de la oferta
const [jobDescription, setJobDescription] = useState<string>(""); // Descripción de la oferta
const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Categoría seleccionada
// Define the Category type
type Category = {
  id: string;
  name: string;
};

const [categories, setCategories] = useState<Category[]>([]); // Lista de categorías



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

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
      message.error("Error al cargar las categorías.");
    }
  };

  useEffect(() => {
    fetchCategories();

    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del localStorage
      if (!token) {
        setError("No se encontró el token. Por favor, inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosClient.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });
        setProfile(response.data); // Guardar los datos del perfil en el estado
        setUpdatedProfile(response.data); // Inicializar el estado de edición
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setError("Error al cargar el perfil. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token. Por favor, inicia sesión.");
      return;
    }

   

    setSaving(true); // Mostrar spinner mientras se guarda
    try {
      await axiosClient.put(
        "/profile",
        updatedProfile, // Enviar los datos actualizados
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(updatedProfile); // Actualizar el estado del perfil con los cambios
      setIsEditing(false); // Salir del modo de edición
      message.success("Perfil actualizado correctamente."); // Mensaje de éxito
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      setError("Error al guardar el perfil. Por favor, intenta nuevamente.");
      message.error("Error al guardar el perfil."); // Mensaje de error
    } finally {
      setSaving(false); // Ocultar spinner
    }
  };

  const handleWhatsAppClick = (phone: string) => {
    const whatsappURL = `https://wa.me/${phone}?text=Hola,%20te%20contacto%20desde%20tu%20perfil%20en%20IndieSkill`;
    window.open(whatsappURL, "_blank"); // Abrir en una nueva pestaña
  };

  const handleCreateJobOffer = async () => {
    if (!jobTitle.trim() || !jobDescription.trim() || !selectedCategory) {
      message.error("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      await axiosClient.post("/job-offers", {
        title: jobTitle.trim(),
        description: jobDescription.trim(),
        categoryId: selectedCategory,
      });
      setJobTitle("");
      setJobDescription("");
      setSelectedCategory(null);
      setIsJobModalVisible(false);
      message.success("Oferta de trabajo creada correctamente.");
    } catch (error) {
      console.error("Error al crear la oferta de trabajo:", error);
      message.error("Error al crear la oferta de trabajo.");
    }
  };
  


  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar onLoginClick={showLoginModal} onRegisterClick={showRegisterModal} />
      <Login visible={isLoginModalVisible} onClose={handleLoginModalClose} />
      <Register visible={isRegisterModalVisible} onClose={handleRegisterModalClose} />
      <div className="perfil-container">
        <main className="perfil-main">
          <div className="perfil-card">
            <div className="perfil-header">
              <div className="perfil-photo"></div>
              <div className="perfil-info">
                <Title level={2}>{profile.name}</Title>
                <Paragraph>
                  <strong>Email:</strong> {profile.email} {/* Email no editable */}
                </Paragraph>
              </div>
            </div>
            <div className="perfil-details">
              <div className="perfil-item">
                <Title level={4}>Dirección</Title>
                {isEditing ? (
                  <Input
                    value={updatedProfile.address}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, address: e.target.value })}
                    placeholder="Dirección"
                  />
                ) : (
                  <Paragraph>{profile.address || "No registrada"}</Paragraph>
                )}
              </div>
              <div className="perfil-item">
                <Title level={4}>Teléfono</Title>
                {isEditing ? (
                  <Input
                  value={updatedProfile.phone}
                  onChange={(e) => setUpdatedProfile({ ...updatedProfile, phone: e.target.value })}
                  placeholder="Teléfono"
                />
                ) : (
                  <Paragraph>
                  <a
                    href="#"
                    onClick={() => handleWhatsAppClick(profile.phone)}
                    style={{ color: "#25D366", textDecoration: "none" }}
                  >
                    📞 {profile.phone || "No registrado"}
                  </a>
                </Paragraph>                )}
              </div>
              <div className="perfil-item">
                <Title level={4}>About</Title>
                {isEditing ? (
                  <TextArea
                    value={updatedProfile.about}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, about: e.target.value })}
                    rows={4}
                    placeholder="Acerca de mí"
                  />
                ) : (
                  <Paragraph>{profile.about || "No hay información registrada."}</Paragraph>
                )}
              </div>
              <div className="perfil-item">
                <Title level={4}>Experience</Title>
                {isEditing ? (
                  <TextArea
                    value={updatedProfile.experience}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, experience: e.target.value })}
                    rows={4}
                    placeholder="Experiencia"
                  />
                ) : (
                  <Paragraph>{profile.experience || "No hay experiencia registrada."}</Paragraph>
                )}
              </div>
              <div className="perfil-item">
                <Title level={4}>Puestos Ofrecidos</Title>
                {isEditing ? (
                  <TextArea
                    value={updatedProfile.positionsOffered}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, positionsOffered: e.target.value })}
                    rows={4}
                    placeholder="Puestos ofrecidos"
                  />
                ) : (
                  <Paragraph>{profile.positionsOffered || "No hay puestos ofrecidos."}</Paragraph>
                )}
              </div>
              <div className="perfil-item">
                <Title level={4}>Habilidades</Title>
                {isEditing ? (
                  <TextArea
                    value={updatedProfile.skills}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, skills: e.target.value })}
                    rows={4}
                    placeholder="Habilidades"
                  />
                ) : (
                  <Paragraph>{profile.skills || "No hay habilidades registradas."}</Paragraph>
                )}
              </div>
              <div className="perfil-item">
                <Title level={4}>Aptitudes</Title>
                {isEditing ? (
                  <TextArea
                    value={updatedProfile.aptitudes}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, aptitudes: e.target.value })}
                    rows={4}
                    placeholder="Aptitudes"
                  />
                ) : (
                  <Paragraph>{profile.aptitudes || "No hay aptitudes registradas."}</Paragraph>
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="perfil-actions">
                <Spin spinning={saving}>
                  <Button type="primary" onClick={handleSaveProfile} style={{ marginRight: "10px" }}>
                    Guardar
                  </Button>
                </Spin>
                <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
              </div>
            ) : (
              <Button type="primary" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </Button>
            )}
            <Button
  type="primary"
  style={{ marginTop: "20px" }}
  onClick={() => setIsJobModalVisible(true)}
>
  Crear Oferta de Trabajo
</Button>

<Modal
  title="Crear Oferta de Trabajo"
  visible={isJobModalVisible}
  onCancel={() => setIsJobModalVisible(false)}
  footer={null}
>
  <Form layout="vertical">
    <Form.Item label="Título de la oferta" required>
      <Input
        placeholder="Ejemplo: Desarrollador Frontend"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
    </Form.Item>
    <Form.Item label="Descripción de la oferta" required>
      <TextArea
        rows={4}
        placeholder="Describe los detalles del trabajo"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
    </Form.Item>
    <Form.Item label="Categoría" required>
  <Select
    placeholder="Selecciona una categoría"
    value={selectedCategory}
    onChange={(value) => setSelectedCategory(value)} // Aquí se asigna el id de la categoría seleccionada
  >
    {categories.map((category) => (
      <Option key={category.id} value={category.id}> {/* El id de la categoría se usa como valor */}
        {category.name}
      </Option>
    ))}
  </Select>
</Form.Item>
    <Form.Item>
      <Button type="primary" onClick={handleCreateJobOffer}>
        Crear Oferta
      </Button>
    </Form.Item>
  </Form>
</Modal>
            
          </div>
        </main>
      </div>

    </div>
    
  );
};

export default Perfil;