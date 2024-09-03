import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

export default function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();

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
      <Typography variant="h6">Music App</Typography>
      <IconButton
        sx={{ color: 'white' }}
        onClick={() => dispatch(toggleTheme())}
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
