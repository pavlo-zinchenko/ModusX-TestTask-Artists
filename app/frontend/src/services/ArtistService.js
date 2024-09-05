import axiosInstance from '../api/axiosConfig';
import { executeRequest } from '../utils/executeRequest';

export const getArtists = async () => {
    return await executeRequest(
        () => axiosInstance.get('/artists'),
        'Artists fetched successfully'
    );
};

export const getArtist = async (artistId) => {
    return await executeRequest(
        () => axiosInstance.get(`/artists/${artistId}`),
        'Artist details fetched successfully'
    );
};

export const getArtistSongs = async (artistId, page = 1, limit = 5) => {
    const response = await executeRequest(
        () => axiosInstance.get(`/artists/${artistId}/songs?page=${page}&limit=${limit}`),
        `Songs for artist ${artistId} fetched successfully`
    );

    return {
        songs: response,
        totalPages: Math.ceil(response.total / limit)
    };
};