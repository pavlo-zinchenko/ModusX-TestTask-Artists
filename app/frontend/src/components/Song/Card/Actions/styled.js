import styled from 'styled-components';
import { Box } from '@mui/material';

const SActionsContainer = styled(Box)(() => ({
    position: 'absolute',
    bottom: 0,
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-between',
}));

export default SActionsContainer;
