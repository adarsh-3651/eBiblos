import React, { createContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes'; // Importing routes
import { SnackbarProvider } from 'notistack'; // For global snackbars

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <SnackbarProvider maxSnack={3}> {/* For global Snackbar notifications */}
          <div>
            <AppRoutes /> {/* Render all defined routes */}
          </div>
        </SnackbarProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
