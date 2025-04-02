import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/actions/cartActions';
// import { addToWishlist } from '../redux/actions/wishlistActions';
// import { formatPrice } from '../utils/formatPrice';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Snackbar, Alert, CardActions, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { animated, useSpring } from 'react-spring';

const BookCard = ({ book }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart(book));
        setSnackbar({ open: true, message: t('added_to_cart'), severity: 'success' });
    }, [dispatch, book, t]);

    const handleAddToWishlist = useCallback(() => {
        dispatch(addToWishlist(book));
        setSnackbar({ open: true, message: t('added_to_wishlist'), severity: 'info' });
    }, [dispatch, book, t]);

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 300 } });

    return (
        <animated.div style={fadeIn}>
            <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardMedia component="img" height="200" image={book.image} alt={book.title} />
                <CardContent>
                    <Typography variant="h6" gutterBottom>{book.title}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">{book.author}</Typography>
                    <Typography variant="h6" color="primary">{}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<ShoppingCartIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                    >
                        {t('add_to_cart')}
                    </Button>
                    <IconButton color="secondary" onClick={handleAddToWishlist}>
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </animated.div>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default BookCard;