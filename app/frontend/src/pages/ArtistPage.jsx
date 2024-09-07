import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Box } from '@mui/material';

import { fetchArtist } from '@slices/artistsSlice';
import { fetchArtistSongs } from '@slices/songsSlice';
import { setPage } from '@slices/songsSlice';
import Loading from '@common/Loading';

import Pagination from '@components/Pagination';
import SongsList from '../components/Song/List';

export default function ArtistPage() {
  const { artistId } = useParams();
  const dispatch = useDispatch();

  const { songs, loading, totalPages, page } = useSelector((state) => state.songs);
  const { artist } = useSelector((state) => state.artists);

  const [currentSongId, setCurrentSongId] = useState(null);

  useEffect(() => {
    dispatch(fetchArtist(artistId));
    dispatch(fetchArtistSongs(artistId, page));
  }, [artistId, page, dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Loading />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          alt={artist.name}
          src={artist.avatar
            ? `${import.meta.env.VITE_API_URL}/uploads/avatars/${artist.avatar}`
            : '/default-avatar.png'}
          sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="h4">{artist.name}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}>
        {!songs?.length ? (
          <Typography>No songs available</Typography>
        ) : (
          <SongsList
            songs={songs}
            currentSongId={currentSongId}
            setCurrentSongId={setCurrentSongId}
          />
        )}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
}
