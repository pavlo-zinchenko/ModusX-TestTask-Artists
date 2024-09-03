import axiosInstance from '../axiosConfig';

export const getUser = (userId) => {
  return axiosInstance.get(`/users/${userId}`);
};

export const updateUser = (userId, data) => {
  return axiosInstance.put(`/users/${userId}`, data);
};
