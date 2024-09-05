import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default function SongCard({ song, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(song.id);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const songName = song.name.replace('.mp3', '');

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={song.cover === 'NULL' ? '/placeholder.png' : song.cover}
          alt={songName}
          style={{ width: '60px', height: '60px', marginRight: '10px', borderRadius: '4px' }}
        />
        <CardContent>
          <Typography variant="h6">{songName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDuration(song.duration)}
          </Typography>
        </CardContent>
      </Box>

      <IconButton onClick={handleFavoriteClick}>
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
}
