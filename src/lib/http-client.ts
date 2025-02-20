import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://crudcrud.com/api/49989d0dfffd4214b56c8c0b4b7d34c1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
