import React from 'react';
import { Form, Input, Button,  Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './login.css';
import loginImg from '../../assets/login_img.png';

interface LoginProps {
  visible: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ visible, onClose }) => {
  const onFinish = (values: unknown) => {
    console.log('Success:', values);
    onClose(); // Close the modal on successful login
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
      <div className="login-container">
        <div className="login-left">
          <h2>Start Now</h2>
          <ul>
            <li>More than 30 categories</li>
            <li>More than 30 categories</li>
            <li>More than 30 categories</li>
          </ul>
          <img src={loginImg} alt="Illustration" />
        </div>
        <div className="login-right">
          <h2>Continue</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical" // Cambia el layout a vertical
          >
            <Form.Item
              label="Email or Username"
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
            <a href="#" className="forgot-password">Forgot Password?</a>


            <Form.Item>
              <Button type="primary" htmlType="submit" className="boton_login">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;