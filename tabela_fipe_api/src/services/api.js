import axios from 'axios';

const api = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1',
  // baseURL: 'http://api.fipeapi.com.br/v1',
});

export default api;