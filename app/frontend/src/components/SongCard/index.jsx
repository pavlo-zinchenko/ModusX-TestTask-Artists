import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { Download, FavoriteBorder, Favorite, PlayArrow, Pause } from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';

const SongCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '800px',
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

const SongDetailsBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '150px',
}));

const ActionButtonsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CoverBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '150px',
  height: '150px',
  '&:hover .playPauseButton': {
    opacity: 1,
  },
}));

const StyledCardMedia = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
}));

const PlayPauseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  transition: 'opacity 0.3s ease',
  opacity: 0.7,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    opacity: 1,
  },
}));

export default function SongCard({ song, onToggleFavourite, currentSongId, setCurrentSongId, isFavorited }) {
  const songUrl = `${import.meta.env.VITE_API_URL}/uploads/songs/${song.name}.mp3`;
  const coverUrl = song.cover
    ? `${import.meta.env.VITE_API_URL}/uploads/covers/${song.cover}`
    : '/default.png';

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (currentSongId !== song.id) {
      setCurrentSongId(song.id);
      audioRef.current.audio.current.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioRef.current.audio.current.pause();
      } else {
        audioRef.current.audio.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (currentSongId !== song.id && isPlaying) {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    }
  }, [currentSongId, song.id, isPlaying]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = songUrl;
    link.setAttribute('download', song.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SongCardContainer>
      <CoverBox>
        <StyledCardMedia src={coverUrl} alt={song.name} />
        <PlayPauseButton className="playPauseButton" onClick={handlePlayPause}>
          {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </PlayPauseButton>
      </CoverBox>

      <SongDetailsBox sx={{ flexGrow: 1, justifyContent: 'space-between', ml: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {song.name}
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 'auto', fontSize: '14px' }}>
            {song.duration}
          </Typography>
        </Box>

        <AudioPlayer
          ref={audioRef}
          src={songUrl}
          showJumpControls={false}
          showDownloadProgress={false}
          autoPlayAfterSrcChange={false}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{
            display: 'block',
            position: 'absolute',
            width: '100%',
            bottom: '0px',
            border: 'none',
            boxShadow: 'none',
          }}
        />
      </SongDetailsBox>

      <Stack direction="column" spacing={1} justifyContent="center" alignItems="center" ml={2}>
        <IconButton
          onClick={onToggleFavourite}
          sx={{
            color: isFavorited ? 'error.main' : 'text.primary',
            transition: 'color 0.2s ease',
            '&:hover': { color: 'error.light' },
            marginBottom: 1,
          }}
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton
          onClick={handleDownload}
          sx={{
            color: 'primary.main',
            transition: 'color 0.2s ease',
            '&:hover': { color: 'primary.dark' },
          }}
        >
          <Download />
        </IconButton>
      </Stack>
    </SongCardContainer>
  );
}
