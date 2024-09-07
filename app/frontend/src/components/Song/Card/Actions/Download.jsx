import { IconButton } from '@mui/material';
import { Download as DownloadUI } from '@mui/icons-material';

export default function Download({ url, name, artist_id }) {
  function handleDownload() {
    const artistId = encodeURIComponent(artist_id);
    const link = document.createElement('a');
    url = url.replace('upload', 'download');
    link.href = `${url}?artist_id=${artist_id}`;
    link.setAttribute('download', `${name} - ${artistId}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
