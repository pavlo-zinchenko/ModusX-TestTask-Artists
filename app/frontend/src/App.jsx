import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '@components/Header/index';
import Footer from '@components/Footer/index';
import ArtistPage from '@pages/ArtistPage';
import ArtistsPage from '@pages/ArtistsPage';
import FavouritesPage from '@pages/FavouritesPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import RegistrationPage from '@pages/RegistrationPage';
import { loadFavourites } from '@store/slices/favouritesSlice';

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    loadFavourites(isAuthenticated, dispatch);
  }, [dispatch, isAuthenticated]);

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
      <ToastContainer />
      <Footer />
    </div>
  );
}
