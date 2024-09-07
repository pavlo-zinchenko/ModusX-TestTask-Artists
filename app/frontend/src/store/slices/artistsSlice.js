import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artists: [],
  error: null,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearArtists: (state) => {
      state.artists = [];
    },
  },
});

export const { setArtists, setError, clearArtists } = artistsSlice.actions;
export default artistsSlice.reducer;
