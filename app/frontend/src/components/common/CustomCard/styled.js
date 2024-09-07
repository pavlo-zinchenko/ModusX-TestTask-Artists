import styled from 'styled-components';

import Card from '@mui/material/Card';

const SCard = styled(Card)`
  min-width: 200px;
  margin: 0;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export default SCard;
