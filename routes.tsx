import { Routes, Route } from 'react-router-dom';
import Home from './src/Pages/Home/home';
import Perfil from './src/Pages/Perfil/Perfil';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/perfil' element={<Perfil />} />
      </Routes>
   
  );
};

export default AppRoutes;
