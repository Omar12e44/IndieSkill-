import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes'
import "antd/dist/reset.css"; // Asegura que los estilos de Ant Design están cargados
import { message } from 'antd';


function App() {
  message.config({
    top: 80,
    duration: 2,
    maxCount: 3,
    // Removed zIndex as it is not a valid property of ConfigOptions
  });
  return (
    <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
  )
}

export default App
