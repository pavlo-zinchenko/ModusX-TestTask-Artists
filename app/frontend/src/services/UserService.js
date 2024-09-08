import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';

export const getUser = async (userId) => {
    return await executeRequest(() => axiosInstance.get(`/users/${userId}`));
};

export const updateUser = async (userId, data) => {
    return await executeRequest(() => axiosInstance.put(`/users/${userId}`, data));
};
