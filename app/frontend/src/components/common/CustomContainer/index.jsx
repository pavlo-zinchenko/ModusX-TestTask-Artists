import { Box } from '@mui/material';

export default function Container({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexGrow: 1,
        padding: '20px',
      }}
    >
      {children}
    </Box>
  );
}
