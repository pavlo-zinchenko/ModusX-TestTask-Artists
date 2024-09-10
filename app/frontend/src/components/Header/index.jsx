import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Button, Badge } from '@mui/material';
import { ArrowBack, Brightness4, Brightness7, Favorite } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { toggleTheme } from '@slices/themeSlice';

export default function Header() {
  const [headerTitle, setHeaderTitle] = useState('Music App');
  const [isReturnButton, setIsReturnButton] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const favoriteCount = useSelector((state) => state.favourites?.favouriteSongs?.length);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const { pathname } = location;
    let title = 'Music App';

    switch (pathname) {
      case '/login':
        setIsReturnButton(false);
        title = 'Sign In';
        break;
      case '/register':
        setIsReturnButton(false);
        title = 'Sign Up';
        break;
      case '/artists':
        setIsReturnButton(false);
        title = 'Artists';
        break;
      case '/favourites':
        setIsReturnButton(true);
        title = 'Favourites';
        break;
      case /^\/artists\/\d+$/.test(pathname):
        setIsReturnButton(true);
        title = `Artist`;
        break;
      default:
        setIsReturnButton(false);
        title = 'Music App';
        break;
    }

    setHeaderTitle(title);
    document.title = title;
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const navigateTo = (url) => {
    if (location.pathname === url) {
      navigate(url, { replace: true });
    } else {
      navigate(url);
    }
  };

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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isReturnButton && (
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer', ml: isReturnButton ? 1 : 0 }}>
          {headerTitle}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigateTo('/favourites')} sx={{ color: 'white', ml: 1, mr: 1, }}>
          <Badge badgeContent={favoriteCount} color="error">
            <Favorite />
          </Badge>
        </IconButton>

        <IconButton
          sx={{ color: 'white', ml: 1, mr: 1, }}
          aria-label="toggle theme"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        
        {!isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigateTo('/login')}>
              Sign In
            </Button>
            <Button color="inherit" onClick={() => navigateTo('/register')}>
              Sign Up
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        )}
      </Box>
    </Box>
  );
}
