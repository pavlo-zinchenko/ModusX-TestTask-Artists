import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchArtists } from '@slices/artistsSlice';
import ScrollableLine from './ScrollableLine';

export default function ArtistsCarousel() {
  const dispatch = useDispatch();
  const { loading, artists } = useSelector((state) => state.artists);

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
  }, [dispatch, artists.length]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Discover Artists
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <ScrollableLine />
      </Box>
    </Box>
  );  
}
