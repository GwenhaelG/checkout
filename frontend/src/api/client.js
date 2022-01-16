import axios from 'axios';
import config from '../config';

const client = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: config.api.HOST,
});

export default client;
