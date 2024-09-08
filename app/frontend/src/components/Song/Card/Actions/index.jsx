import SActionsContainer from './styled';
import AddFavourite from './AddFavourite';
import Download from './Download';

export default function Actions({ song }) {
  return (
    <SActionsContainer>
      <Download {...song} />
      <AddFavourite id={song.id} />
    </SActionsContainer>
  );
}
