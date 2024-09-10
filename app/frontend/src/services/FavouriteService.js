import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';
import { SONGS_PER_PAGE } from '@constants/api';

export const getFavourites = async () => {
    const response = await executeRequest(() => axiosInstance.get('/favourites'));
    return response.favouriteSongs;
};

export const getFavouritesPagination = async (page = 1, limit = SONGS_PER_PAGE) => {
    const ids = JSON.parse(localStorage.getItem('favouriteSongs'))?.map((favSong) => favSong.id);
    return await executeRequest(() =>
        axiosInstance.post(`/favourites/pagination`, {
            page,
            limit,
            ids
        })
    );
};


export const addFavourite = async (song_id) => {
    return await executeRequest(() => axiosInstance.post(`/favourites`, { song_id }));
};

export const removeFavourite = async (song_id) => {
    return await executeRequest(() => axiosInstance.delete(`/favourites`, { data: { song_id } }));
};
