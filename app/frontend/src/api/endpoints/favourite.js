import axiosInstance from '../axiosConfig';

export const getFavourites = () => {
  return axiosInstance.get('/favourites');
}

export const addFavourite = (artistId) => {
  return axiosInstance.post(`/favourites/${artistId}`);
}

export const removeFavourite = (artistId) => {
  return axiosInstance.delete(`/favourites/${artistId}`);
}
