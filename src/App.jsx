import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, Loader } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setError("Failed to check authentication status");
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
          <p className="text-sm mt-2">Please refresh the page or try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;