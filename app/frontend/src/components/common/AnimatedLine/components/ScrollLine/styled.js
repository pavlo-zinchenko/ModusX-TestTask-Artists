import styled, { keyframes } from 'styled-components';

import { Box } from '@mui/material';

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const SAnimatedLine = styled(Box)`
  display: flex;
  animation: ${scroll} 30s linear infinite;
  min-width: 200%;
`;

export default SAnimatedLine;
