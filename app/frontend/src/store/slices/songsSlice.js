import { createSlice } from '@reduxjs/toolkit';
import { getArtistSongs } from '@services/ArtistService';
import { notifyError } from '@utils/ToastNotifications';
import { SONGS_PER_PAGE } from '@constants/api';

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
    const { songs, totalPages } = await getArtistSongs(artistId, page, SONGS_PER_PAGE);

    dispatch(setSongs(songs));
    dispatch(setTotalPages(totalPages));
  } catch (error) {
    notifyError('Failed to load artist songs');
  }
};

export default songsSlice.reducer;
