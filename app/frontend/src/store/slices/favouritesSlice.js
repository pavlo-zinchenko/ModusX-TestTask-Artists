import { createSlice } from '@reduxjs/toolkit';
import { getFavourites, addFavourite, removeFavourite } from '@services/FavouriteService';

export const loadFavouritesFromStorage = () => {
  const storedFavourites = localStorage.getItem('favouriteSongs');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export const loadFavourites = async (isAuthenticated, dispatch) => {
  if (!isAuthenticated) {
    const storageFavourites = loadFavouritesFromStorage();
    dispatch(loadFavouritesSuccess(storageFavourites));
    return;
  }

  try {
    const data = await getFavourites();
    if (data && data.length > 0) {
      dispatch(loadFavouritesSuccess(data));
    } else {
      const storageFavourites = loadFavouritesFromStorage();
      dispatch(loadFavouritesSuccess(storageFavourites));
    }
  } catch (error) {
    const storageFavourites = loadFavouritesFromStorage();
    dispatch(loadFavouritesSuccess(storageFavourites));
  }
};

const initialState = {
  favouriteSongs: [],
  page: 1,
  totalPages: 1,
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const song_id = action.payload;
      const isAuthenticated = Boolean(localStorage.getItem('token'));

      const existingSong = state.favouriteSongs?.map((favSong) => favSong.id).includes(song_id);

      if (existingSong) {
        state.favouriteSongs = state.favouriteSongs?.filter((favSong) => favSong.id !== song_id);
        if (isAuthenticated) {
          removeFavourite(song_id);
        }
      } else {
        state.favouriteSongs = [...state.favouriteSongs, { id: song_id }];
        if (isAuthenticated) {
          addFavourite(song_id);
        }
      }

      localStorage.setItem('favouriteSongs', JSON.stringify(state.favouriteSongs));
    },
    loadFavouritesSuccess: (state, action) => {
      state.favouriteSongs = action.payload;
      localStorage.setItem('favouriteSongs', JSON.stringify(state.favouriteSongs));
    },
    setFavouritesPage: (state, action) => {
      state.page = action.payload;
    },
    setFavouritesTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  toggleFavourite,
  loadFavouritesSuccess,
  setFavouritesPage,
  setFavouritesTotalPages
} = favouritesSlice.actions;
export default favouritesSlice.reducer;

export const fetchFavouritesSongs = (page = 1) => async (dispatch) => {
  const { favouriteSongs, totalPages } = await getFavourites(page);
  dispatch(loadFavouritesSuccess(favouriteSongs));
  dispatch(setFavouritesTotalPages(totalPages));
};
