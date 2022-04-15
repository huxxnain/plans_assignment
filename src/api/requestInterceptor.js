import axios from 'axios';
import {getUserToken} from '../utils/localStorage.util';

axios.interceptors.request.use(function (config) {
    const token = getUserToken();
    if (token) {
        config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
});

export default axios;