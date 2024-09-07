import { Card, CardContent, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ArtistCard({ artist }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
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
        src={artist.avatar ? `${import.meta.env.VITE_API_URL}/uploads/avatars/${artist.avatar}` : '/default-avatar.png'}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div">
          {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {artist.songs_count} {artist.songs_count === 1 ? 'song' : 'songs'}
        </Typography>
      </CardContent>
    </Card>
  );
}
