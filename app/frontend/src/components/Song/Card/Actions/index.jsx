import { Stack } from '@mui/material';

import AddFavourite from './AddFavourite';
import Download from './Download';

export default function Actions({ song }) {
  return (
    <Stack
      direction="column"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      ml={2}
    >
      {/* <AddFavourite /> */}
      <Download {...song} />
    </Stack>
  );
}
