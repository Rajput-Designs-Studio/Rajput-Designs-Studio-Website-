import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import PortfolioGalleryPage from './pages/PortfolioGalleryPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderFormPage from './pages/OrderFormPage.jsx';
import OrderReceivedPage from './pages/OrderReceivedPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio-gallery" element={<PortfolioGalleryPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout/:slug" element={<CheckoutPage />} />
        <Route path="/order/:slug" element={<OrderFormPage />} />
        <Route path="/order-received" element={<OrderReceivedPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
