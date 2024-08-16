// axiosConfig.js
import axios from 'axios';

// Configuração do Axios
axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.withCredentials = true;

export default axios;