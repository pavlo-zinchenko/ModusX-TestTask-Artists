import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import CustomCard from '@common/CustomCard';
import { CardMedia } from '@mui/material';

const url = `${import.meta.env.VITE_API_URL}/uploads/avatars/`;

export default function ScrollableLine({ artists, navigate }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (lineRef.current) {
        const firstChild = lineRef.current.firstChild;
        const firstChildWidth = firstChild.offsetWidth;

        lineRef.current.scrollLeft += 1;

        if (lineRef.current.scrollLeft >= firstChildWidth) {
          lineRef.current.scrollLeft -= firstChildWidth;
          lineRef.current.appendChild(firstChild);
        }
      }
    };

    const intervalId = setInterval(scroll, 10);

    return () => clearInterval(intervalId);
  }, [artists]);

  return (
    <Box
      ref={lineRef}
      sx={{
        display: 'flex',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        position: 'relative',
      }}
    >
      {artists.map((artist) => (
        <CustomCard
          key={artist.id}
          onClick={() => navigate(`/artists/${artist.id}`)}
          sx={{
            width: '150px',
            height: '200px',
            cursor: 'pointer',
            margin: '0',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            image={artist.avatar ? url + artist.avatar : url + 'NoImage.png'}
            alt={artist.name || 'Unknown Artist'}
          />
        </CustomCard>
      ))}
    </Box>
  );
}
