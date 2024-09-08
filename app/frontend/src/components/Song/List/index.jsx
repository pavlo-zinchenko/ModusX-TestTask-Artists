import SongCard from '../Card';

export default function SongsList({ songs, currentSongId, setCurrentSongId }) {
  return (
    songs.map((song) => (
      <SongCard
        key={song.id}
        song={song}
        currentSongId={currentSongId}
        setCurrentSongId={setCurrentSongId}
      />
    ))
  );
}
