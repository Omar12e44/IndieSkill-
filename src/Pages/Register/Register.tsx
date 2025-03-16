import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './register.css';
import registerImg from '../../assets/freelancer-guia-02.png';

interface RegisterProps {
    visible: boolean;
    onClose: () => void;
  }
  
  const Register: React.FC<RegisterProps> = ({ visible, onClose }) => {
    const onFinish = (values: unknown) => {
      console.log('Success:', values);
      onClose(); // Close the modal on successful registration
    };
  
    const onFinishFailed = (errorInfo: unknown) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={800} // Ajusta el ancho del modal
        centered // Centra el modal en la pantalla
      >
        <div className="register-container">
          <div className="register-left">
            <h2>Join Us</h2>
            <ul>
              <li>Access to exclusive content</li>
              <li>Join a community of professionals</li>
              <li>Get personalized recommendations</li>
            </ul>
            <img src={registerImg} alt="Illustration" />
          </div>
          <div className="register-right">
            <h2>Register</h2>
            <Form
              name="register"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical" // Cambia el layout a vertical
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>
  
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
  
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
  
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
              >
                <Input.Password
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" className="boton_register">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    );
  };
export default Register;