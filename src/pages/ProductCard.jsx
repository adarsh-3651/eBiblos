import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';
import { Container } from '../components';

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await appwriteService.getPost(slug);
      if (response) {
        setPost(response);
        checkLocalStorage(response.$id);
      }
    };
    fetchPost();
  }, [slug]);

  const checkLocalStorage = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setInCart(cart.some((item) => item.id === id));
    setIsFavorite(favorites.some((item) => item.id === id));
  };

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (inCart) {
      const updatedCart = cart.filter((item) => item.id !== post.$id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setInCart(false);
    } else {
      cart.push({ id: post.$id, title: post.title });
      localStorage.setItem('cart', JSON.stringify(cart));
      setInCart(true);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((item) => item.id !== post.$id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push({ id: post.$id, title: post.title });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!post) {
    return (
      <div className="text-center mt-10 text-lg text-gray-500">Loading post...</div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-2">
            Category: <span className="font-medium">{post.category}</span>
          </p>
          <p className="text-gray-500 mb-2">
            Location: <span className="font-medium">{post.location}</span>
          </p>
          <p className="text-gray-700 mb-4">
            Rate: <span className="font-semibold">Rs {post.rate}</span>
          </p>

          {/* Featured Images */}
          {post.featuredImage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {Array.isArray(post.featuredImage) ? (
                post.featuredImage.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`featured-${index}`}
                    className="rounded-lg shadow w-full"
                  />
                ))
              ) : (
                <img
                  src={post.featuredImage}
                  alt="featured"
                  className="rounded-lg shadow w-full"
                />
              )}
            </div>
          )}

          {/* Description */}
          <div className="text-gray-700 text-md leading-relaxed mt-6">
            {parse(post.content || '')}
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={toggleCart}
              className={`px-4 py-2 text-sm rounded font-semibold transition ${
                inCart
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {inCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 text-sm rounded font-semibold transition ${
                isFavorite
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                  : 'bg-gray-300 text-black hover:bg-gray-400'
              }`}
            >
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;
