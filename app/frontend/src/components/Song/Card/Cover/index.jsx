import { SCover, SCardMedia, SPlayPauseButton } from './styled';
import { PlayArrow, Pause } from '@mui/icons-material';

export default function Cover({ url, song, setCurrentSongId, isPlaying, setIsPlaying, audioRef }) {
  const handlePlayPause = () => {
    if (song.currentSongId !== song.id) {
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

  return (
    <SCover>
      <SCardMedia src={url} alt={song.name} />
      <SPlayPauseButton className="playPauseButton" onClick={handlePlayPause}>
        {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
      </SPlayPauseButton>
    </SCover>
  );
}
