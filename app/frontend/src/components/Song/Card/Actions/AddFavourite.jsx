import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

export default function AddFavourite() {
  function handleFavourite() {
    dispatch(toggleFavourite(song.id));
  }

  return (
    <IconButton
      onClick={handleFavourite}
      sx={{
        color: isFavorited ? 'error.main' : 'text.primary',
        transition: 'color 0.2s ease',
        '&:hover': { color: 'error.light' },
        marginBottom: 1,
      }}
    >
      {isFavorited ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}
