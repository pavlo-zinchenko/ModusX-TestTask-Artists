import axiosInstance from '../axiosConfig';

export const getArtists = () => {
  return axiosInstance.get('/artists');
}

export const getArtist = (artistId) => {
  return axiosInstance.get(`/artists/${artistId}`);
}
