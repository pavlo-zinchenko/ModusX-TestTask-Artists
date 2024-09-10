import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';
import { SONGS_PER_PAGE } from '@constants/api';

export const getArtists = async () => {
    const ids = JSON.parse(localStorage.getItem('favouriteSongs'))?.map((favSong) => favSong.id);
    return await executeRequest(() =>
        axiosInstance.post('/artists', {
            ids,
        })
    );
};

export const getArtist = async (artistId) => {
    return await executeRequest(() => axiosInstance.get(`/artists/${artistId}`));
};

export const getArtistSongs = async (artistId, page = 1, limit = SONGS_PER_PAGE) => {
    const response = await executeRequest(() => axiosInstance.get(`/artists/${artistId}/songs?page=${page}&limit=${limit}`));
    const { songs, totalPages } = response;

    return {
        songs,
        totalPages,
    };
};
