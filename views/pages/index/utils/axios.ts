import axios from 'axios';
// import cookie from 'js-cookie';

const instance = axios.create({});

instance.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.url = 'http://127.0.0.1:9123' + config.url;
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance;