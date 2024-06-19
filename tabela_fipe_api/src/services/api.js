import axios from 'axios';

const api = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1',
  headers: {
    'X-Subscription-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNDcxMjRjOS00NzA1LTRjYTktOTY2Yi1lM2YyZWQxZTc0NTMiLCJlbWFpbCI6Imd1aWxlLnlvbmFtaW5lQGdtYWlsLmNvbSIsImlhdCI6MTcxODgxODA0MH0.nGLvtMs-EGvpm57AoE4RZlXWb1euAVtcMK7KsXjNnBU'  // Adicione seu token aqui
  }
});

export default api;