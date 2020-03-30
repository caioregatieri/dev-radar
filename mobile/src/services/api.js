import axios from 'axios';

const api = axios.create({
  baseURL: 'http://7dd4c183.ngrok.io',
});

export default api;
