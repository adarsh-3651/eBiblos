import { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '@mui/material/styles';
// import { useSpring, animated } from 'react-spring';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSnackbar } from 'notistack';

// Actions
import { addToCart } from '../redux/actions/cartActions';
import { addToWishlist } from '../redux/actions/wishlistActions';
import { fetchBooks, deleteBook } from '../redux/actions/bookActions';

// Utils
// import { formatPrice } from '../utils/formatPrice';

// Appwrite
// import appwriteService from '../appwrite/config';

// Context
import AuthContext from '../context/AuthContext'; // Assuming you have an AuthContext to provide auth details

// Components
import BookCard from '../components/BookCard';

const useAuth = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useContext(AuthContext); // Get user details from AuthContext
  
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [bookToDelete, setBookToDelete] = useState(null);

  const userId = useSelector((state) => state.auth.userId);  // Assuming userId is in auth state

  // useEffect(() => {
  //   appwriteService.getBooks()
  //     .then((response) => {
  //       if (response) {
  //         setBooks(response.documents.filter((book) => book.userId === userId)); // Filter books by userId
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setError(t('error_loading_books'));
  //       setLoading(false);
  //     });
  // }, [t, userId]);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    setSnackbar({ open: true, message: t('added_to_cart'), severity: 'success' });
  };

  const handleAddToWishlist = (book) => {
    dispatch(addToWishlist(book));
    setSnackbar({ open: true, message: t('added_to_wishlist'), severity: 'info' });
  };

  const handleDeleteBook = useCallback((bookId) => {
    setBookToDelete(bookId);
    setOpenDialog(true);
  }, []);

  const confirmDeleteBook = useCallback(() => {
    if (bookToDelete) {
      appwriteService.deleteBook(bookToDelete)
        .then(() => {
          setBooks(books.filter((book) => book.$id !== bookToDelete));  // Update local books state after deletion
          setSnackbar({ open: true, message: t('book_deleted'), severity: 'success' });
          setOpenDialog(false);
        })
        .catch((err) => {
          setSnackbar({ open: true, message: t('error_deleting_book'), severity: 'error' });
          setOpenDialog(false);
        });
    }
  }, [bookToDelete, books, t]);

  const fadeIn = useSpring({ opacity: loading ? 0 : 1, from: { opacity: 0 } });

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return {
    books,
    snackbar,
    setSnackbar,
    handleAddToCart,
    handleAddToWishlist,
    handleDeleteBook,
    confirmDeleteBook,
    fadeIn
  };
};

export default useAuth;
