import axios from 'axios';

// Use Vite dev proxy for API calls during development
const instance = axios.create({
  baseURL: 'https://e-store-1-gr1l.onrender.com',
});

export default instance;
