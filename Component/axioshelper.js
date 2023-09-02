import axios from 'axios';

const axiosUploader = axios.create({
  baseURL: '/api',
  //for timeout issue
  timeout: 600000,
  // TODO Test impact of this setting.
  decompress: false,
});

export default axiosUploader;
