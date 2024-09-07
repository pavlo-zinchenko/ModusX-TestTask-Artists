import { createSlice } from '@reduxjs/toolkit';
import { getArtists, getArtist } from '@services/ArtistService';
import { notifySuccess, notifyError } from '@utils/ToastNotifications';

const initialState = {
  artists: [],
  artist: null,
  loading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setArtistsSuccess: (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    },
    setArtistSuccess: (state, action) => {
      state.artist = action.payload;
      state.loading = false;
    },
    setFailure: (state) => {
      state.loading = false;
    },
    clearArtist: (state) => {
      state.artist = null;
    },
  },
});

export const {
  setLoading,
  setArtistsSuccess,
  setArtistSuccess,
  setFailure,
  clearArtist,
} = artistsSlice.actions;

export const fetchArtists = () => async (dispatch, getState) => {
  const { artists } = getState().artists;

  if (artists.length > 0) {
    return;
  }

  dispatch(setLoading());

  try {
    const response = await getArtists();
    dispatch(setArtistsSuccess(response));
    notifySuccess('Artists loaded successfully');
  } catch (error) {
    dispatch(setFailure('Failed to fetch artists'));
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
    dispatch(setArtistSuccess(response));
    notifySuccess('Artist loaded successfully');
  } catch (error) {
    dispatch(setFailure('Failed to fetch artist details'));
    notifyError('Failed to load artist details');
  }
};

export const clearSelectedArtist = () => (dispatch) => {
  dispatch(clearArtist());
};

export default artistsSlice.reducer;
