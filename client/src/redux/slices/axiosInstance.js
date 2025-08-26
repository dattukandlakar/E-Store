import axios from 'axios';

// Base URL: use Vite env override if provided, else use Render URL in production, empty in dev (Vite proxy)
const baseURL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.PROD ? 'https://e-store-1-gr1l.onrender.com' : '');

const instance = axios.create({ baseURL });

export default instance;
