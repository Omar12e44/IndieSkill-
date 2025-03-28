import React, { useState, useEffect } from "react";
import { Card, Button, Input, Modal, message, Typography, Row, Col, Spin } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosClient from "../../Services/api";
import "./Categories.css";

const { Title } = Typography;
const { TextArea } = Input;

interface Category {
  id: string;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Lista de categorías
  const [newCategory, setNewCategory] = useState<string>(""); // Nueva categoría
  const [newDescription, setNewDescription] = useState<string>(""); // Descripción de la nueva categoría
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para el modal de confirmación
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null); // Categoría a eliminar
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      message.error("Error al cargar las categorías.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !newDescription.trim()) {
      message.error("El nombre y la descripción de la categoría no pueden estar vacíos.");
      return;
    }

    try {
      const response = await axiosClient.post("/categories", {
        name: newCategory.trim(),
        description: newDescription.trim(),
      });
      setCategories([...categories, response.data]); // Agregar la nueva categoría a la lista
      setNewCategory("");
      setNewDescription("");
      message.success("Categoría creada correctamente.");
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      message.error("Error al crear la categoría.");
    }
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setIsModalVisible(true);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await axiosClient.delete(`/categories/${categoryToDelete.id}`);
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id)); // Eliminar la categoría de la lista
      message.success("Categoría eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      message.error("Error al eliminar la categoría.");
    } finally {
      setIsModalVisible(false);
      setCategoryToDelete(null);
    }
  };

  const cancelDeleteCategory = () => {
    setIsModalVisible(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="categories-container">
      <Title level={2}>Categorías</Title>
      <div className="categories-input">
        <Input
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <TextArea
          placeholder="Descripción"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          rows={2}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCategory}>
          Crear
        </Button>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {categories.map((category) => (
            <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={category.name}
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCategory(category)}
                  >
                    Eliminar
                  </Button>,
                ]}
              >
                <p>{category.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title="Confirmar eliminación"
        visible={isModalVisible}
        onOk={confirmDeleteCategory}
        onCancel={cancelDeleteCategory}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <p>¿Estás seguro de que deseas eliminar la categoría "{categoryToDelete?.name}"?</p>
      </Modal>
    </div>
  );
};

export default Categories;