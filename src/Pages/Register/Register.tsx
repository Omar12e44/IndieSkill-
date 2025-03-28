/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import axiosClient from "../../Services/api";
import "./register.css";
import registerImg from "../../assets/freelancer-guia-02.png";

interface RegisterProps {
  visible: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ visible, onClose }) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);
    setMessage(null); 
    
    setEmail(values.email);
    setPassword(values.password);

    try {
      const response = await axiosClient.post("/register", {
        email: values.email,
        password: values.password,
        name: values.name, // Enviar el nombre
        phone: values.phone, // Enviar el teléfono
        address: values.address, // Enviar la dirección
      });
  

      const responseData = await response.data;
      console.log("Respuesta del servidor:", responseData); // 🔥 Esto es para depurar


      if (responseData.secret) {
        setQrCode(responseData.secret); // Asignar el secret al estado qrCode
        setSecret(responseData.secret); // Establecer el secret para la verificación OTP
        setShowOtpInput(true); // Cambiar el estado de showOtpInput a true
        setMessage({ type: "success", text: "¡Registro exitoso! Escanea el código QR." });
      } else {
        setMessage({ type: "error", text: "Ocurrió un error en el registro" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Ocurrió un error en el registro" });
    } finally {
      setLoading(false);
    }
  };


  const verifyOtp = async () => {
    try {
      const response = await axiosClient.post("/verify-otp", {
        email,
        password,
        secret,
        token: otp,
      });
  
      const data = response.data;
      if (response.status === 200) {
        setMessage({ type: "success", text: "¡Registro exitoso!" });
        setTimeout(() => {
          setMessage(null); // Limpia el mensaje después de unos segundos
          onClose(); // Cierra el modal
        }, 3000);
      } else {
        setMessage({ type: "error", text: "Error verificando OTP" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error verificando OTP" });
    }
  };

  // useEffect para depurar si showOtpInput está cambiando
  useEffect(() => {
    console.log("Estado showOtpInput cambiado:", showOtpInput);
  }, [showOtpInput]);

  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={800} centered>
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

          {/* 🔥 Mostrar el mensaje si existe */}
          {message && (
            <Alert
              message={message.text}
              type={message.type}
              showIcon
              closable
              style={{ marginBottom: "15px" }}
            />
          )}

          {!showOtpInput ? (
            <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input />
            </Form.Item>
          
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
          
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
          
            {/* Nuevos campos para información adicional */}
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input />
            </Form.Item>
          
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please input your phone number!" }]}>
              <Input />
            </Form.Item>
          
            <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please input your address!" }]}>
              <Input />
            </Form.Item>
          
            <Form.Item>
              <Button type="primary" htmlType="submit" className="boton_register" loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
          ) : (
            <>
              <h3>Escanea este código QR en Google Authenticator:</h3>
              {qrCode && <QRCodeCanvas value={qrCode} size={200} />}
              <Form layout="vertical">
                <Form.Item label="Código OTP">
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={verifyOtp}>
                    Verificar OTP
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Register;
