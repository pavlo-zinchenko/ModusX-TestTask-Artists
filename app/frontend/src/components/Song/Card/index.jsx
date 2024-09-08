// id, cover, name, duration
import { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';

import Container from './Container';
import Cover from './Cover';
import Details from './Details';
import { baseURL } from '@constants/api';

export default function SongCard({ song: originalSong, currentSongId, setCurrentSongId = null }) {
  const song = {
    ...originalSong,
    url: `${baseURL}/uploads/songs/${originalSong.name}.mp3`,
  };
  const coverUrl = song.cover ? `${baseURL}/uploads/covers/${song.name}.png` : '/default.png';
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSongId !== song.id && isPlaying) {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    }
  }, [currentSongId, song.id, isPlaying]);

  return (
    <Container>
      <Cover
        url={coverUrl}
        song={song}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setCurrentSongId={setCurrentSongId}
      />

      <Details>
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
          src={song.url}
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
            backgroundColor: 'transparent',
          }}
        />
      </Details>
    </Container>
  );
}
