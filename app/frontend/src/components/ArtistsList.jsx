import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import ArtistCard from './ArtistCard';
import { getArtists } from '../services/ArtistService';

export default function ArtistsList() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      setArtists(data);
    };

    fetchArtists();
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', margin: '20px 0' }}>
        Artists
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </Box>
    </Box>
  );
}
