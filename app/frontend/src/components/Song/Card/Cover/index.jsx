import { SCover, SCardMedia, SPlayPauseButton } from './styled';
import { PlayArrow, Pause } from '@mui/icons-material';
import Actions from '../Actions';

export default function Cover({ coverUrl, song, currentSongId, setCurrentSongId, isPlaying, setIsPlaying, audioRef }) {
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

  return (
    <SCover>
      <SCardMedia src={coverUrl} alt={song.name} />
      <SPlayPauseButton className="playPauseButton" onClick={handlePlayPause}>
        {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
      </SPlayPauseButton>
      <Actions song={song} />
    </SCover>
  );
}
