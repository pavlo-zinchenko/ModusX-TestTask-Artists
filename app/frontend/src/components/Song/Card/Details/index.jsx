import SDetails from './styled';

export default function Details({ children }) {
  return (
    <SDetails
      sx={{
        flexGrow: 1,
        justifyContent: 'space-between',
        ml: 2
      }}
    >
      {children}
    </SDetails>
  );
}