import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3001', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    });

    axiosClient.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token'); // Obtener el token del localStorage
          if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Agregar el token al header
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la respuesta:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;