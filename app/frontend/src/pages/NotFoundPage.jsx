import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFoundPage() {
  return (
    <>
      <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', marginBottom: 2 }} />
      <Typography variant="h2" component="h1" color="primary" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: 3 }}
      >
        Go to Homepage
      </Button>
    </>
  );
}
