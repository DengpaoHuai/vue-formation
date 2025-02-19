import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://crudcrud.com/api/4a72c7a0e21741259758034adea42372',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
