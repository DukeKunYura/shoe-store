import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/Pages/MainPage/MainPage';
import Preloader from './components/Preloader/Preloader';
const CatalogPage = React.lazy(() => import('./components/Pages/CatalogPage/CatalogPage'));
const AboutPage = React.lazy(() => import('./components/Pages/AboutPage/AboutPage'));
const ContactsPage = React.lazy(() => import('./components/Pages/ContactsPage/ContactsPage'));
const NotFound = React.lazy(() => import('./components/Pages/NotFound/NotFound'));
const ProductPage = React.lazy(() => import('./components/Pages/ProductPage/ProductPage'));
const PushcartPage = React.lazy(() => import('./components/Pages/PushcartPage/PushcartPage'));


function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog.html" element={<CatalogPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/contacts.html" element={<ContactsPage />} />
          <Route path="/cart.html" element={<PushcartPage />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
