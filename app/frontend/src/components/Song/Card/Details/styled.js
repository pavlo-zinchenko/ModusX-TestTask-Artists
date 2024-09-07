import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const SDetails = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '150px',
}));

export default SDetails;
