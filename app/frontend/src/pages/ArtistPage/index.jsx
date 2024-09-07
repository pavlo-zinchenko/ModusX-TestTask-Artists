import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Box, Button } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import { fetchArtist } from '@slices/artistsSlice';
import { fetchArtistSongs } from '@slices/songsSlice';
import SongCard from '@components/SongCard';
import { setPage } from '@slices/songsSlice';
import { toggleFavourite } from '@slices/favouritesSlice';
import Loading from '@common/Loading';

export default function ArtistPage() {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { songs, loading, totalPages, page } = useSelector((state) => state.songs);
  const { artist } = useSelector((state) => state.artists);
  const favouriteSongs = useSelector((state) => state.favourites.favouriteSongs);

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
        )}

        {totalPages > 1 && (
          <Box
            sx={{
              mt: 3,
              mb: 5,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="outlined"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              startIcon={<ArrowLeft />}
              sx={{ mx: 0.5 }}
            >
              Prev
            </Button>

            {[...Array(totalPages).keys()].map((_, i) => (
              <Button
                key={i + 1}
                variant={i + 1 === page ? 'contained' : 'outlined'}
                onClick={() => handlePageChange(i + 1)}
                sx={{ mx: 0.5 }}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outlined"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              endIcon={<ArrowRight />}
              sx={{ mx: 0.5 }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
