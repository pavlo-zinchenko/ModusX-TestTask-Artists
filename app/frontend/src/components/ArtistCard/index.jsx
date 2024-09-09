import { Card, CardContent, Avatar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setArtist } from '@slices/artistsSlice';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '@constants/api';

export default function ArtistCard({ artist }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    dispatch(setArtist(artist));
    navigate(`/artists/${artist.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        width: 220,
        margin: '20px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Avatar
        alt={artist.name}
        src={artist.avatar ? `${baseURL}/uploads/avatars/${artist.avatar}` : '/default-avatar.png'}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <CardContent sx={{ textAlign: 'center', padding: 1, paddingBottom: 0 }}>
        <Typography variant="h6" component="div">
          {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Content time: {artist.total_duration || '00:00'}<br />
        You liked songs: {artist.liked_count}<br />
        {artist.songs_count === 1 ? 'Song' : 'Songs'}: {artist.songs_count}
        </Typography>
      </CardContent>
    </Card>
  );
}
