import axiosInstance from '../axiosConfig';

export const getFavorites = () => {
  return axiosInstance.get('/favorites');
}

export const addFavorite = (artistId) => {
  return axiosInstance.post(`/favorites/${artistId}`);
}

export const removeFavorite = (artistId) => {
  return axiosInstance.delete(`/favorites/${artistId}`);
}
