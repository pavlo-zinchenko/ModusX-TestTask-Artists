import { createSlice } from '@reduxjs/toolkit';
import { addFavourite, removeFavourite } from '@services/FavouriteService';

const loadFavouritesFromStorage = () => {
  const storedFavourites = localStorage.getItem('favouriteSongs');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

const initialState = {
  favouriteSongs: loadFavouritesFromStorage(),
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const songId = action.payload;
      const isAuthenticated = Boolean(localStorage.getItem('token'));

      if (state.favouriteSongs.includes(songId)) {
        state.favouriteSongs = state.favouriteSongs.filter(id => id !== songId);
        console.log(`Removing song ${songId} from favourites`);
        if (isAuthenticated) {
          removeFavourite(songId);
        }
      } else {
        state.favouriteSongs.push(songId);
        console.log(`Adding song ${songId} to favourites`);
        if (isAuthenticated) {
          addFavourite(songId);
        }
      }

      localStorage.setItem('favouriteSongs', JSON.stringify(state.favouriteSongs));
    },
    clearFavourites: (state) => {
      state.favouriteSongs = [];
      localStorage.removeItem('favouriteSongs');
      console.log('Clearing all favourites');
    },
    loadFavourites: (state, action) => {
      state.favouriteSongs = action.payload;
      localStorage.setItem('favouriteSongs', JSON.stringify(state.favouriteSongs));
    }
  },
});

export const { toggleFavourite, clearFavourites, loadFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
