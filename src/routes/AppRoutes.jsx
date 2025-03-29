import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Pages/Components
import Home from '../pages/Home';  // Home page where users can browse books
import BookDetails from '../pages/BookDetails'; // Page to view details of a specific book
import SellerDashboard from '../pages/SellerDashboard'; // Seller panel to manage book listings
import Login from '../pages/Login'; // Login page
import Register from '../pages/Register'; // Register page
import Cart from '../pages/Cart';  // Shopping cart page
import NotFound from '../pages/NotFound';  // 404 Not Found page

const AppRoutes = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
