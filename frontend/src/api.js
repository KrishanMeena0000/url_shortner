import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
});

// // Add interceptor to include token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // Adjust based on where you store the token
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default API;
