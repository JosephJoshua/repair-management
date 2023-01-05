import axios from 'axios';
import reviveDate from './reviveDate';

const apiClient = axios.create({
  timeout: 30 * 1_000,
  transformResponse: [reviveDate],
});

export default apiClient;
