import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function StartNow() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Get Started Now!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontWeight: 'bold', fontSize: '16px' }}
        onClick={() => navigate('/artists')}
      >
        Check Out Artists
      </Button>
    </Box>
  );
}
