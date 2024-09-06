import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Typography, Box, IconButton, Button, CircularProgress, Alert } from '@mui/material';
import { ArrowBack, ArrowLeft, ArrowRight } from '@mui/icons-material';
import { getArtist, getArtistSongs } from '../services/ArtistService';
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
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const artistData = await getArtist(artistId);
        const { name, avatar, songs_count: total } = artistData;
        setArtist({ name, avatar });

        const { songs: songData } = await getArtistSongs(artistId, page, itemsPerPage);

        if (Array.isArray(songData.songs)) {
          setSongs(songData.songs);
        } else {
          setSongs([]);
        }

        console.log(total, itemsPerPage, Math.ceil(total / itemsPerPage))
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (error) {
        setError('Failed to fetch artist details or songs.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === page ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(i)}
          sx={{ mx: 0.5 }}
        >
          {i}
        </Button>
      );
    }

    return (
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          startIcon={<ArrowLeft />}
          sx={{ mx: 0.5 }}
        >
          Prev
        </Button>
        {pages}
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
    );
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
          src={artist.avatar === 'NULL' ? '/placeholder.png' : `${import.meta.env.VITE_API_URL}/uploads/avatars/${artist.avatar}`}
          sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="h4">{artist.name}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!songs.length && <Typography>No songs available</Typography>}

        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}

        {totalPages > 1 && renderPagination()}
      </Box>
    </Box>
  );
}
