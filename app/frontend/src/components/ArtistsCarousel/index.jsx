import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomCard from '@common/CustomCard';
import { getArtists } from '@services/ArtistService';
import { setArtists } from '@slices/artistsSlice';
import ScrollableLine from '@common/ScrollableLine';
import { CardMedia } from '@mui/material';

const url = `${import.meta.env.VITE_API_URL}/uploads/avatars/`;

export default function ArtistsCarousel() {
  const [artists, setArtistsState] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      dispatch(setArtists(data));
      setArtistsState(data);
    };

    fetchArtists();
  }, [dispatch]);

  return (
    <Box sx={{ textAlign: 'center', mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Discover Artists
      </Typography>

      <ScrollableLine artists={artists} navigate={navigate} />
    </Box>
  );
}
