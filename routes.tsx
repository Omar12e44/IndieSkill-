import { Routes, Route } from 'react-router-dom';
import Home from './src/Pages/Home/home';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
   
  );
};

export default AppRoutes;
