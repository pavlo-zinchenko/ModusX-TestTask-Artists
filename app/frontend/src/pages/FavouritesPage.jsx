import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { fetchFavouritesSongs, setFavouritesPage } from '@slices/favouritesSlice';
import SongCard from '@components/Song/Card';
import Pagination from '@components/Pagination';
import { SONGS_PER_PAGE } from '@constants/api';

export default function FavouritesPage() {
  const dispatch = useDispatch();
  const { favouriteSongs, totalPages, page } = useSelector((state) => state.favourites);
  const [currentSongId, setCurrentSongId] = useState(null);

  const start = (page - 1) * SONGS_PER_PAGE;
  const end = start + SONGS_PER_PAGE;
  const songs = favouriteSongs?.slice(start, end);

  useEffect(() => {
    dispatch(fetchFavouritesSongs(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(setFavouritesPage(newPage));
  };

  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Favourites
      </Typography>

      {favouriteSongs && favouriteSongs.length === 0 ? (
        <Typography>No favourite songs yet.</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isFavorited={true}
                currentSongId={currentSongId}
                setCurrentSongId={setCurrentSongId}
              />
            ))}
          </Box>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </Box>
  );
}
