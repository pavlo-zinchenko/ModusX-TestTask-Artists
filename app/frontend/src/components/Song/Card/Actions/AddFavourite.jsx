import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { toggleFavourite } from '@slices/favouritesSlice';

export default function AddFavourite({ id }) {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) => state.favourites.favouriteSongs.map((song) => song.id).includes(id));

  function handleFavourite() {
    dispatch(toggleFavourite(id));
  }

  return (
    <IconButton
      onClick={handleFavourite}
      sx={{
        padding: 0,
        color: isFavorited ? 'error.main' : 'text.primary',
        transition: 'color 0.2s ease',
        '&:hover': { color: 'error.light' },
      }}
    >
      {isFavorited ?
        <Favorite sx={{
          fontSize: '2rem',
          backgroundColor: 'background.paper',
          borderRadius: '7px 0 0',
          padding: '6px 2px 2px 6px',
        }}
        /> :
        <FavoriteBorder
          sx={{
            fontSize: '2rem',
            backgroundColor: 'background.paper',
            borderRadius: '7px 0 0',
            padding: '6px 2px 2px 6px',
          }}
        />
      }
    </IconButton>
  );
}
