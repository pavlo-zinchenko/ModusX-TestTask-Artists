import { IconButton } from '@mui/material';
import { Download as DownloadUI } from '@mui/icons-material';
import { downloadFile } from '@services/DownloadService';

export default function Download({ url, name, artist_id }) {
  const handleDownload = () => {
    downloadFile(url, name, artist_id);
  };

  return (
    <IconButton
      onClick={handleDownload}
      sx={{
        color: 'primary.main',
        transition: 'color 0.2s ease',
        '&:hover': { color: 'primary.dark' },
      }}
    >
      <DownloadUI />
    </IconButton>
  );
}
