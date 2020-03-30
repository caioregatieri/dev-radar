import axios from 'axios';

const api = axios.create({
  baseURL: 'http://8f93f2ed.ngrok.io',
});

export default api;
