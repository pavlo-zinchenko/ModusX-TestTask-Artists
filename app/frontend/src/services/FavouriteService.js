import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';

export const getFavourites = async () => {
    return await executeRequest(() => axiosInstance.get('/favourites'));
};

export const addFavourite = async (song_id) => {
    return await executeRequest(() => axiosInstance.post(`/favourites`, { song_id }));
};

export const removeFavourite = async (song_id) => {
    return await executeRequest(() => axiosInstance.delete(`/favourites`, { data: { song_id } }));
};
