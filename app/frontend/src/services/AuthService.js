import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';

export const login = async (credentials) => {
    return await executeRequest(() => axiosInstance.post('/auth/login', credentials));
};

export const register = async (userData) => {
    return await executeRequest(() => axiosInstance.post('/auth/register', userData));
};
