import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';
import ArtistCard from '@components/ArtistCard';
import { getArtists } from '@services/ArtistService';
import { setArtists, setError, clearArtists } from '@slices/artistsSlice';
import Loading from '@common/Loading';

export default function ArtistsPage() {
  const dispatch = useDispatch();
  const { artists, error } = useSelector((state) => state.artists);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        dispatch(setArtists(data));
        setLoading(false);
      } catch (error) {
        dispatch(setError('Failed to fetch artists'));
        setLoading(false);
      }
    };

    fetchArtists();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
