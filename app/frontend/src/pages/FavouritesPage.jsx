import { useState } from 'react';
import { useSelector } from 'react-redux';
import SongCard from '@components/Song/Card';
import { Box, Typography } from '@mui/material';

export default function FavouritesPage() {
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
              currentSongId={currentSongId}
              setCurrentSongId={setCurrentSongId}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
