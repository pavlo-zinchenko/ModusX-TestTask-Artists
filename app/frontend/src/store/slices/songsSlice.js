import { createSlice } from '@reduxjs/toolkit';
import { getArtistSongs } from '@services/ArtistService';
import { notifyError } from '@utils/ToastNotifications';

const initialState = {
  songs: [],
  page: 1,
  totalPages: 1,
  loading: true,
};

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
      state.loading = false;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setLoading, setSongs, setPage, setTotalPages } = songsSlice.actions;

export const fetchArtistSongs = (artistId, page = 1) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const { songs, totalPages } = await getArtistSongs(artistId, page, 5);

    dispatch(setSongs(songs));
    dispatch(setTotalPages(totalPages));
  } catch (error) {
    notifyError('Failed to load artist songs');
    window.location.reload();
  }
};

export default songsSlice.reducer;
