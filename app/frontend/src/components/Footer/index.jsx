import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.text',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2">&copy; 2024 Music Store</Typography>
      <Typography variant="body2">Created by Pavlo Zinchenko</Typography>
      <Typography variant="body2">All rights reserved</Typography>
    </Box>
  );
}
