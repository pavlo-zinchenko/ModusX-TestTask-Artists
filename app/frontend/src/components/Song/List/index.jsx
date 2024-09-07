import { useSelector } from 'react-redux';
import SongCard from '../Card';
import { toggleFavourite } from '@slices/favouritesSlice';


export default function SongsList({ songs, currentSongId, setCurrentSongId }) {
  const favouriteSongs = useSelector((state) => state.favourites.favouriteSongs);
  
  return (
    songs.map((song) => (
      <SongCard
        key={song.id}
        song={song}
        currentSongId={currentSongId}
        setCurrentSongId={setCurrentSongId}
        isFavourited={favouriteSongs.includes(song.id)}
        onToggleFavourite={() => dispatch(toggleFavourite(song.id))}
      />
    ))
  );
}