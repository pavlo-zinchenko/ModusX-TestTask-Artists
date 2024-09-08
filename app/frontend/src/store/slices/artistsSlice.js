import { createSlice } from '@reduxjs/toolkit';
import { getArtists, getArtist } from '@services/ArtistService';
import { notifyError } from '@utils/ToastNotifications';

const initialState = {
  artists: [],
  selectedArtist: null,
  loading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setArtist: (state, action) => {
      state.selectedArtist = action.payload;
      state.loading = false;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    },
    clearArtist: (state) => {
      state.selectedArtist = null;
    },
    clearArtists: (state) => {
      state.selectedArtist = null;
    },
  },
});

export const {
  setLoading,
  setArtist,
  setArtists,
  setFailure,
  clearArtist,
  clearArtists,
} = artistsSlice.actions;

export const fetchArtists = () => async (dispatch, getState) => {
  const { artists } = getState().artists;

  if (artists.length > 0) {
    return;
  }

  dispatch(setLoading());

  try {
    const response = await getArtists();
    dispatch(setArtists(response));
  } catch (error) {
    notifyError('Failed to load artists');
  }
};

export const fetchArtist = (artistId) => async (dispatch, getState) => {
  const { artist } = getState().artists;

  if (artist && artist.id === artistId) {
    return;
  }

  dispatch(setLoading());

  try {
    const response = await getArtist(artistId);
    dispatch(setArtist(response));
  } catch (error) {
    notifyError('Failed to load artist details');
  }
};

export const clearSelectedArtist = () => (dispatch) => {
  dispatch(clearArtist());
};

export const clearSelectedArtists = () => (dispatch) => {
  dispatch(clearArtists());
};

export default artistsSlice.reducer;
