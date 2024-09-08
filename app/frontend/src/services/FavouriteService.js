import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';

export const getFavourites = async () => {
    return await executeRequest(() => axiosInstance.get('/favourites'));
};

export const addFavourite = async (artistId) => {
    return await executeRequest(() => axiosInstance.post(`/favourites/${artistId}`));
};

export const removeFavourite = async (artistId) => {
    return await executeRequest(() => axiosInstance.delete(`/favourites/${artistId}`));
};
