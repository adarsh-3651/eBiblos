// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';

// Import or create placeholder components for other pages
const ReaderPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Reader Page</h1></div>;
const ProfilePage = () => <div className="p-4"><h1 className="text-2xl font-bold">Profile Page</h1></div>;
const BookDetailPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Book Detail Page</h1></div>;
const CartPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Shopping Cart</h1></div>;
const NotFoundPage = () => <div className="p-4"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        
        {/* Protected routes - could add authentication check later */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reader" element={<ReaderPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* Handle 404 and redirects */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;