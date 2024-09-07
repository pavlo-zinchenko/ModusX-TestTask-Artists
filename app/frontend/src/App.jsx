import { Routes, Route } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@components/Header';
import Footer from '@components/Footer';

import ArtistPage from '@pages/ArtistPage';
import ArtistsPage from '@pages/ArtistsPage';
import FavouritesPage from '@pages/FavouritesPage';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import RegistrationPage from '@pages/RegistrationPage';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flexGrow: 1,
          padding: '20px',
        }}
      >
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ArtistsPage />} />
          <Route path="/artists/:artistId" element={<ArtistPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  );
}
