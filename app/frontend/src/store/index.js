import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '@slices/themeSlice';
import artistsReducer from '@slices/artistsSlice';
import songsReducer from '@slices/songsSlice';
import favourites from '@slices/favouritesSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    favourites: favourites,
    theme: themeReducer,
    songs: songsReducer,
  },
});

export default store;
