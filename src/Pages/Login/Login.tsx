/* eslint-disable @typescript-eslint/no-explicit-any */
import  {useState} from 'react';
import { Form, Input, Button, Modal,  Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axiosClient from '../../Services/api';
import './login.css';
import loginImg from '../../assets/login_img.png';

interface LoginProps {
  visible: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    setMessage(null); // Limpiar el mensaje anterior
    try {
      const response = await axiosClient.post('/login', {
        email: values.username, // Enviar el email o username
        password: values.password,
      });

      const data = response.data;

      setMessage({ type: 'success', text: '¡Inicio de sesión exitoso!' });
      console.log('Token:', data.token); // Aquí puedes guardar el token en localStorage o context

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      setTimeout(() => {
        onClose();
      }, 2000); // Cerrar el modal
      window.location.reload(); // Recargar la página para reflejar el cambio de estado
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Ocurrió un error al iniciar sesión',
      });
    } finally {
      setLoading(false);
    }
  };


  const handleForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    setMessage(null); // Limpiar el mensaje anterior
    try {
      await axiosClient.post('/reset-password', { email: values.email });
      setMessage({ type: 'success', text: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.' });
      setForgotPasswordVisible(false); // Cerrar el modal de "Forgot Password"
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Ocurrió un error al enviar el correo de recuperación',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <a
                href="#"
                className="forgot-password"
                onClick={() => setForgotPasswordVisible(true)} // Mostrar el modal de "Forgot Password"
              >
                Forgot Password?
              </a>

              {message && (
                <Alert
                  message={message.text}
                  type={message.type}
                  showIcon
                  style={{ marginBottom: '15px' }}
                />
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="boton_login"
                  loading={loading}
                  disabled={loading}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>

      {/* Modal para "Forgot Password" */}
      <Modal
        visible={forgotPasswordVisible}
        onCancel={() => setForgotPasswordVisible(false)}
        footer={null}
        centered
      >
        <h2>Forgot Password</h2>
        <Form
          name="forgotPassword"
          onFinish={handleForgotPassword}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Send Reset Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;