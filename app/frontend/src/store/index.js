import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '@slices/themeSlice';
import artistsReducer from '@slices/artistsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    artists: artistsReducer,
  },
});

export default store;
