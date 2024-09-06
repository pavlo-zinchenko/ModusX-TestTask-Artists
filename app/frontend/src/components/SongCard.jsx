import { Box, Typography, IconButton, Stack, CardMedia } from '@mui/material';
import { Download, FavoriteBorder, Favorite, PlayArrow } from '@mui/icons-material';
import { useState } from 'react';

export default function SongCard({ song, onToggleFavorite }) {
  const songUrl = `${import.meta.env.VITE_API_URL}/uploads/songs/${song.name}`;
  const coverUrl = `${import.meta.env.VITE_API_URL}/uploads/covers/${song.cover}` || '/default-cover.png';
  
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    if (onToggleFavorite) {
      onToggleFavorite(song.id);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Логика проигрывания песни
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        width: '100%',
        mb: 3,
        p: 3,
        bgcolor: 'background.default',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      {/* Обложка с кнопкой воспроизведения */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: 180 },
          height: 180,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image={coverUrl}
          alt={song.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' },
            transition: 'all 0.3s ease',
            boxShadow: 2,
          }}
          onClick={handlePlay}
        >
          <PlayArrow fontSize="large" />
        </IconButton>
      </Box>

      {/* Информация о песне */}
      <Stack
        spacing={2}
        sx={{
          flex: 1,
          pl: { sm: 3 },
          pt: { xs: 2, sm: 0 },
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {song.name}
        </Typography>

        {/* Проигрыватель */}
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <audio controls style={{ width: '100%' }}>
            <source src={songUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>

        {/* Кнопки действия */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%', justifyContent: { xs: 'center', sm: 'flex-start' } }}
        >
          <IconButton
            onClick={handleFavoriteToggle}
            sx={{
              color: isFavorited ? 'error.main' : 'text.primary',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'error.light' },
            }}
          >
            {isFavorited ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <IconButton
            component="a"
            href={songUrl}
            download={song.name}
            sx={{
              color: 'primary.main',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'primary.dark' },
            }}
          >
            <Download />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
