// src/api/axiosConfig.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8081/',  // Default to this if env var is not set
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
