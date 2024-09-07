import { Routes, Route } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ArtistPage from '@pages/ArtistPage/index';
import ArtistsPage from '@pages/ArtistsPage';
import FavouritesPage from '@pages/FavouritesPage/index';
import HomePage from '@pages/HomePage/index';
import LoginPage from '@pages/LoginPage/index';
import NotFoundPage from '@pages/NotFoundPage/index';
import RegistrationPage from '@pages/RegistrationPage/index';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:artistId" element={<ArtistPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
