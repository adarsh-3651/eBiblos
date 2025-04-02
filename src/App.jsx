import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Fixed import path (renamed from CardContext)
import AppRoutes from './routes/AppRoutes';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Added for consistent theming
import CssBaseline from '@mui/material/CssBaseline'; // For CSS reset

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <SnackbarProvider 
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            autoHideDuration={3000}
          >
            <AppRoutes />
          </SnackbarProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;