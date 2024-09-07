import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favouriteSongs: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const songId = action.payload;
      if (state.favouriteSongs.includes(songId)) {
        state.favouriteSongs = state.favouriteSongs.filter(id => id !== songId);
      } else {
        state.favouriteSongs.push(songId);
      }
    },
    clearFavourites: (state) => {
      state.favouriteSongs = [];
    },
  },
});

export const { toggleFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
