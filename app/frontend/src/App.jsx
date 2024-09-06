import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ArtistsPage />} />
        <Route path="/artists/:artistId" element={<ArtistPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
