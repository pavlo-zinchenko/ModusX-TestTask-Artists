import { Box, Typography, Card, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Stack from '@common/Stack';

import ArtistsCarousel from '@components/ArtistsCarousel';

const features = [
  {
    title: 'Search & Discover',
    description: 'Find music from a large catalog of artists and genres.',
  },
  {
    title: 'Download Music',
    description: 'Download your favorite songs and listen to them offline anytime.',
  },
  {
    title: 'Save Favorites',
    description: 'Save and organize your favorite tracks and create playlists.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for music...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1db954, #1ed760)',
          color: 'white',
          borderRadius: 2,
          mb: 5,
          p: 5,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Discover Your Favorite Music
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Search, download, and save your favorite music from a wide range of artists.
        </Typography>
        <TextField
          label="Search for music"
          variant="outlined"
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '500px',
          }}
          InputProps={{ sx: { paddingLeft: '10px' } }}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
          onClick={handleSearch}
        >
          Search Now
        </Button>
      </Box>

      <ArtistsCarousel />

      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Why Choose Our App?
        </Typography>
        <Stack
          direction="horizontal"
          spacing={4}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          {features.map((feature, index) => (
            <Box key={index} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body1">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Get Started Today!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: '16px' }}
          onClick={() => navigate('/register')}
        >
          Sign Up Now
        </Button>
      </Box>
    </Box>
  );
}
