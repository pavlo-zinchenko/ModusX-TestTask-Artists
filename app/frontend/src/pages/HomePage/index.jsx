import { Box } from '@mui/material';

import ArtistsCarousel from '@components/ArtistsCarousel';
import StartNow from '@components/StartNow';
import Features from '@components/Features';

export default function HomePage() {
  return (
    <Box sx={{ pt: 5 }}>
      <ArtistsCarousel />
      <StartNow />
      <Features />
    </Box>
  );
}
