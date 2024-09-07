import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const FEATURES = [
    {
        title: 'Search & Discover',
        description: 'Find music from a large catalog of artists and genres.',
        icon: <SearchIcon sx={{ fontSize: 50 }} />,
    },
    {
        title: 'Download Music',
        description: 'Download your favourite songs and listen to them offline anytime.',
        icon: <DownloadIcon sx={{ fontSize: 50 }} />,
    },
    {
        title: 'Save Favourites',
        description: 'Save and organize your favourite tracks and create playlists.',
        icon: <FavoriteIcon sx={{ fontSize: 50 }} />,
    },
];
