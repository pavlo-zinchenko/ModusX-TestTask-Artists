import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomCard from '@common/CustomCard';
import { getArtists } from '@services/ArtistService';
import { setArtists } from '@slices/artistsSlice';
import AnimatedLine from '../common/AnimatedLine/components/ScrollLine';
import { CardMedia } from '@mui/material';

const url = `${import.meta.env.VITE_API_URL}/uploads/avatars/`;

export default function ArtistsCarousel() {
  const artists = useSelector((state) => state.artists.artists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      dispatch(setArtists(data));
    };

    fetchArtists();
  }, [dispatch]);

  return (
    <Box sx={{ textAlign: 'center', mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Discover Artists
      </Typography>

      <AnimatedLine>
        {artists.map((artist) => (
          <CustomCard
            key={artist.id}
            onClick={() => navigate(`/artists/${artist.id}`)}
            sx={{
              width: '150px',
              height: '200px',
              cursor: 'pointer',
              margin: '0 10px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
              image={artist.avatar ? url + artist.avatar : url + 'NoImage.png'}
              alt={artist.name || 'Unknown Artist'}
            />
          </CustomCard>
        ))}
      </AnimatedLine>
    </Box>
  );
}
