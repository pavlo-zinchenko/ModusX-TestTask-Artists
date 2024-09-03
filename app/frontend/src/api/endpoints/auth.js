import axiosInstance from '../axiosConfig';

export const register = (data) => {
    return axiosInstance.post('/auth/register', data);
};

export const login = (data) => {
    return axiosInstance.post('/auth/login', data);
};
