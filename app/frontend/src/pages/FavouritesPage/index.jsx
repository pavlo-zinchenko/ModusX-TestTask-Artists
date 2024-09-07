import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongCard from '@components/SongCard';
import { Box, Typography } from '@mui/material';
import { toggleFavourite } from '@slices/favouritesSlice';

export default function FavouritesPage() {
  const dispatch = useDispatch();
  const favouriteSongs = useSelector((state) => state.favourites.favouriteSongs);
  const allSongs = useSelector((state) => state.songs.songs);

  const favouriteSongDetails = allSongs.filter((song) => favouriteSongs.includes(song.id));

  const [currentSongId, setCurrentSongId] = useState(null);

  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Favourites
      </Typography>

      {favouriteSongDetails.length === 0 ? (
        <Typography>No favorite songs yet.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {favouriteSongDetails.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isFavorited={true}
              onToggleFavourite={() => dispatch(toggleFavourite(song.id))}
              currentSongId={currentSongId}
              setCurrentSongId={setCurrentSongId}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
