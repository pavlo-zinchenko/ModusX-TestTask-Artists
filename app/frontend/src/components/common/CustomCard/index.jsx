import SCard from './styled';

export default function CustomCard({ children, ...props }) {
  return (
    <SCard {...props}>{children}</SCard>
  );
}
