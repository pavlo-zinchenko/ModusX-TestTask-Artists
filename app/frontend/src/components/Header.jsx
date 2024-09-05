import { Box, Typography, IconButton, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toggleTheme } from '../redux/slices/themeSlice';

export default function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Music App - Home';
        break;
      case '/login':
        document.title = 'Music App - Sign In';
        break;
      case '/signup':
        document.title = 'Music App - Sign Up';
        break;
      default:
        document.title = 'Music App';
    }
  }, [location.pathname]);

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
        Music App
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isAuthenticated() ? (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Sign Up</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Log Out</Button>
        )}

        <IconButton
          sx={{ color: 'white', ml: 2 }}
          onClick={() => dispatch(toggleTheme())}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
    </Box>
  );
}
