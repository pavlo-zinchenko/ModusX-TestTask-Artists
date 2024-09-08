import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';

export const getArtists = async () => {
    return await executeRequest(() => axiosInstance.get('/artists'));
};

export const getArtist = async (artistId) => {
    return await executeRequest(() => axiosInstance.get(`/artists/${artistId}`));
};

export const getArtistSongs = async (artistId, page = 1, limit = 5) => {
    const response = await executeRequest(() => axiosInstance.get(`/artists/${artistId}/songs?page=${page}&limit=${limit}`));
    const { songs, totalPages } = response;

    return {
        songs,
        totalPages,
    };
};
