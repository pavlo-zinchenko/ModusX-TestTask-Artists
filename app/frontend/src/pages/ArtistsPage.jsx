import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ArtistCard from '@components/ArtistCard/index';
import { fetchArtists } from '@slices/artistsSlice';
import Progress from '@common/Progress';

export default function ArtistsPage() {
  const dispatch = useDispatch();
  const { artists, loading } = useSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) {
    return <Progress />;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: 'center',
          margin: '20px 0'
        }}
      >
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
          <ArtistCard
            key={artist.id}
            artist={artist}
          />
        ))}
      </Box>
    </Box>
  );
}
