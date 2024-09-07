import { Link } from 'react-router-dom';

import { Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import CustomContainer from '@common/CustomContainer';

export default function NotFoundPage() {
  return (
    <CustomContainer>
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
    </CustomContainer>
  );
}
