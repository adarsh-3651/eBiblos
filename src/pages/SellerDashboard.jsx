import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchBooks, deleteBook } from '../redux/actions/bookActions';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import { useSpring, animated } from 'react-spring';
import BookCard from '../components/BookCard';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
// import appwriteService from "../appwrite/config"; // Assuming this provides the books API call
// import { formatPrice } from '../utils/formatPrice';

const SellerDashboard = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const userId = useSelector((state) => state.auth.userId); // Assuming userId is in auth state

    // useEffect(() => {
    //     appwriteService.getBooks()
    //         .then((response) => {
    //             if (response) {
    //                 setBooks(response.documents.filter(book => book.userId === userId)); // Filter books by userId
    //                 setLoading(false);
    //             }
    //         })
    //         .catch((err) => {
    //             setError(t('error_loading_books'));
    //             setLoading(false);
    //         });
    // }, [t, userId]);

    const handleDeleteBook = useCallback((bookId) => {
        setBookToDelete(bookId);
        setOpenDialog(true);
    }, []);

    const confirmDeleteBook = useCallback(() => {
        if (bookToDelete) {
            appwriteService.deleteBook(bookToDelete)
                .then(() => {
                    setBooks(books.filter(book => book.$id !== bookToDelete)); // Update local books state after deletion
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

    return (
        <animated.div style={fadeIn}>
            <Box className="w-full py-8">
                <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                    {t('manage_your_books')}
                </Typography>

                {/* Add Book Button */}
                <Box textAlign="center" mb={4}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/add-book')}>
                        {t('add_new_book')}
                    </Button>
                </Box>

                {/* Book List */}
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    {books.length === 0 ? (
                        <Typography variant="h6" color="textSecondary" textAlign="center">
                            {t('no_books_available')}
                        </Typography>
                    ) : (
                        books.map((book) => (
                            <Box key={book.$id} p={2} maxWidth={300}>
                                <BookCard book={book} />
                                {/* Delete Book Button */}
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteBook(book.$id)}
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <Typography variant="caption">{t('delete')}</Typography>
                                </IconButton>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>

            {/* Snackbar Notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Confirm Delete Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{t('confirm_delete')}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{t('are_you_sure_delete')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={confirmDeleteBook} color="primary">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </animated.div>
    );
};

export default SellerDashboard;
// Note: The above code assumes that you have a Redux store set up with an auth slice that contains the userId.