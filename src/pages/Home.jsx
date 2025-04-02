import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts } from '../redux/actions/postActions'; // Assuming you've created this action
import { useTranslation } from 'react-i18next';
import { Box, Typography, CircularProgress, Snackbar, Alert, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useMediaQuery } from 'react-responsive';
import appwriteService from "../appwrite/config"; // Assuming this provides the posts API call

const Home = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    
    useEffect(() => {
        appwriteService.getPosts()
            .then((response) => {
                if (response) {
                    setPosts(response.documents);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setError(t('error_loading_posts'));
                setLoading(false);
            });
    }, [t]);

    const handlePostClick = useCallback((post) => {
        // Placeholder for post click handling (maybe navigate to post details)
        setSnackbar({ open: true, message: t('post_clicked', { title: post.title }), severity: 'info' });
    }, [t]);

    // Animation for the list of posts
    const fadeIn = useSpring({ opacity: loading ? 0 : 1, from: { opacity: 0 } });

    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <animated.div style={fadeIn}>
            <Box className="w-full py-8">
                <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                    {t('latest_posts')}
                </Typography>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    {posts.length === 0 ? (
                        <Typography variant="h6" color="textSecondary" textAlign="center">
                            {t('no_posts_available')}
                        </Typography>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.$id} sx={{ maxWidth: 345, m: 2 }}>
                                <CardMedia
                                    component="img"
                                    alt={post.title}
                                    height="140"
                                    image={post.image || 'https://via.placeholder.com/150'}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">{post.title}</Typography>
                                    <Typography variant="body2" color="textSecondary" noWrap>
                                        {post.description}
                                    </Typography>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => handlePostClick(post)}
                                        fullWidth
                                    >
                                        {t('view_details')}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>
            </Box>

            {/* Snackbar for feedback */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </animated.div>
    );
};

export default Home;
