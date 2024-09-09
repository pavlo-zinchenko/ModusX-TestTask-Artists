import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';

export const getFavourites = async () => {
    const response = await executeRequest(() => axiosInstance.get('/favourites'));
    return response.favouriteSongs;
};

export const getFavouritesPagination = async (page = 1, limit = 5) => {
    const ids = JSON.parse(localStorage.getItem('favouriteSongs'))?.map((favSong) => favSong.id);
    const response = await executeRequest(() =>
        axiosInstance.post(`/favourites/pagination`, {
            page,
            limit,
            ids
        })
    );

    return response;
};


export const addFavourite = async (song_id) => {
    return await executeRequest(() => axiosInstance.post(`/favourites`, { data: { song_id } }));
};

export const removeFavourite = async (song_id) => {
    return await executeRequest(() => axiosInstance.delete(`/favourites`, { data: { song_id } }));
};
