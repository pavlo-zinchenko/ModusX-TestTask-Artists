import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const SContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));

export default SContainer;
