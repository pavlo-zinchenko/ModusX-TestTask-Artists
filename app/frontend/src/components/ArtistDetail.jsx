import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Typography, Box, IconButton, Button, CircularProgress, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getArtist, getArtistSongs } from '../services/artistService';
import SongCard from './SongCard';

export default function ArtistDetail() {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const artistData = await getArtist(artistId);
        setArtist(artistData);

        const { songs: songData, total } = await getArtistSongs(artistId, page);

        if (Array.isArray(songData)) {
          setSongs(songData);
        } else {
          setSongs([]);
        }

        setTotalPages(Math.ceil(total / 5));
      } catch (error) {
        setError('Failed to fetch artist details or songs.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId, page]);

  const handleFavoriteToggle = (songId) => {
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBack />
      </IconButton>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          alt={artist.name}
          src={artist.avatar === 'NULL' ? '/placeholder.png' : artist.avatar}
          sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="h4">{artist.name}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Array.isArray(songs) && songs.length > 0 ? (
          <>
          songs.map((song) = (
            <SongCard key={song.id} song={song} onToggleFavorite={handleFavoriteToggle} />
            ))
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                sx={{ mr: 1 }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <Typography>No songs available</Typography>
        )}
      </Box>
    </Box>
  );
}
