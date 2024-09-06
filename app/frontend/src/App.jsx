import { Routes, Route } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ArtistsList from '@components/ArtistsList';
import ArtistDetail from '@components/ArtistDetail';

import LoginPage from '@pages/LoginPage';
import RegistrationPage from '@pages/RegistrationPage';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ArtistsList />} />
        <Route path="/artists/:artistId" element={<ArtistDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}
