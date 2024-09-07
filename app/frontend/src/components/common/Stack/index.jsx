import SStack from './styled';

export default function Stack({ direction = 'vertical', spacing = 0, children, ...props }) {
  return (
    <SStack direction={direction} spacing={spacing} {...props}>
      {children}
    </SStack>
  );
}
