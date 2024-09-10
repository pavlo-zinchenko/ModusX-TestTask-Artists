import { createSlice } from '@reduxjs/toolkit';
import { getFavourites, addFavourite, removeFavourite, getFavouritesPagination } from '@services/FavouriteService';
import { SONGS_PER_PAGE } from '@constants/api';

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
      const songId = action.payload;
      const isAuthenticated = Boolean(localStorage.getItem('token'));

      const isSongInFavourites = state.favouriteSongs?.map((favSong) => favSong.id).includes(songId);

      if (isSongInFavourites) {
        state.favouriteSongs = state.favouriteSongs?.filter((favSong) => favSong.id !== songId);
        if (isAuthenticated) {
          removeFavourite(songId);
          const newTotal = Math.ceil((state.favouriteSongs.length - 1) / SONGS_PER_PAGE);
          state.totalPages = newTotal;

          if (state.page > newTotal) {
            state.page = state.page - 1;
          }
        }
      } else {
        state.favouriteSongs.push({ id: songId });
        if (isAuthenticated) {
          addFavourite(songId);
          state.totalPages = Math.ceil((state.favouriteSongs.length + 1) / SONGS_PER_PAGE);
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
  try {
    const offset = (page - 1) * SONGS_PER_PAGE;

    const data = await getFavouritesPagination(SONGS_PER_PAGE, offset);
    const count = data.length;
    dispatch(loadFavouritesSuccess(data));
    dispatch(setFavouritesTotalPages(Math.ceil(count / SONGS_PER_PAGE)));
  } catch (error) {
    console.error('Error fetching favourite songs:', error);
  }
};
