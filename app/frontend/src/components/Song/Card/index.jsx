import { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import Container from './Container';
import Cover from './Cover';
import Details from './Details';
import { baseURL } from '@constants/api';

export default function SongCard({ song: originalSong, currentSongId, setCurrentSongId }) {
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

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <Container>
      <Cover
        coverUrl={coverUrl}
        song={song}
        isPlaying={isPlaying}
        currentSongId={currentSongId}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setCurrentSongId={setCurrentSongId}
      />

      <Details>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {song.name}
        </Typography>

        <AudioPlayer
          ref={audioRef}
          src={song.url}
          showJumpControls={false}
          showDownloadProgress={false}
          autoPlayAfterSrcChange={false}
          onPlay={handlePlay}
          onPause={handlePause}
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
