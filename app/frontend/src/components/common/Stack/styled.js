import styled from 'styled-components';

const SStack = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction === 'vertical' ? 'column' : 'row')};
  gap: ${(props) => props.spacing || 0}px;
`;

export default SStack;
