import axios from 'axios';
import { baseURL, timeout } from '@constants/api.js';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
