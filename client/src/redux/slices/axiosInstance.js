import axios from 'axios';

// Use Vite dev proxy for API calls during development
const instance = axios.create({
  baseURL: 'https://ec-storee.netlify.app',
});

export default instance;
