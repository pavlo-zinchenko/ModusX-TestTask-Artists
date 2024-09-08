import styled from '@mui/material/styles/styled';
import { Box, IconButton } from '@mui/material';

export const SCover = styled(Box)(() => ({
    position: 'relative',
    width: '150px',
    height: '150px',
    '&:hover .playPauseButton': {
        opacity: 1,
    },
}));

export const SCardMedia = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));

export const SPlayPauseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transition: 'opacity 0.3s ease',
    opacity: 0.7,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        opacity: 1,
    },
}));
