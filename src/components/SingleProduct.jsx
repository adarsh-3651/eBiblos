import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from 'react-icons/fa';

function PostCard({ $id, title = "Untitled Post", featuredImage = [], rate, dateAD }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);

  // Load initial favorite/cart state
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsFavorite(favs.includes($id));
    setInCart(cart.includes($id));
  }, [$id]);

  // Fetch all image URLs
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await appwriteService.getFilePreviews(featuredImage);
        const urls = result.map(img => (typeof img === 'string' ? img : img?.href));
        setImageUrls(urls);
      } catch (error) {
        console.error("Failed to fetch image previews:", error);
      }
    };

    if (Array.isArray(featuredImage) && featuredImage.length > 0) {
      fetchImages();
    } else {
      setImageUrls(["/path/to/default-placeholder-image.jpg"]);
    }
  }, [featuredImage]);

  // Slideshow logic
  useEffect(() => {
    if (imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % imageUrls.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  // Toggle favorite
  const toggleFavorite = (e) => {
    e.preventDefault();
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updated = isFavorite
      ? favs.filter(id => id !== $id)
      : [...favs, $id];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  // Toggle cart
  const toggleCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updated = inCart
      ? cart.filter(id => id !== $id)
      : [...cart, $id];
    localStorage.setItem('cart', JSON.stringify(updated));
    setInCart(!inCart);
  };

  return (
    <Link to={`/post/${$id}`} className="relative block">
      <div className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
        {/* Image Slideshow */}
        <div className="w-full mb-3 rounded-lg overflow-hidden relative h-56">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${title} ${idx}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Loading images...
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>

        {/* Price & Buttons Row */}
        <div className="flex items-center justify-between mt-2">
          {rate && (
            <p className="text-sm font-semibold text-blue-600">
              Rs. {parseFloat(rate).toFixed(2)}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFavorite}
              className="bg-white p-2 rounded-full shadow hover:bg-red-100 text-red-500"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              onClick={toggleCart}
              className="bg-white p-2 rounded-full shadow hover:bg-green-100 text-green-600"
              title={inCart ? "Remove from cart" : "Add to cart"}
            >
              {inCart ? <FaShoppingCart /> : <FaCartPlus />}
            </button>
          </div>
        </div>

        {/* Valid Till */}
        {dateAD && (
          <p className="text-xs text-gray-500 mt-1">Valid Till: {dateAD}</p>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
