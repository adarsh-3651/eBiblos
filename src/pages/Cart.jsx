import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

export default function Cart() {
  // State to store cart item IDs from localStorage
  const [cart, setCart] = useState([]);

  // State to store detailed post info
  const [posts, setPosts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Load cart IDs from localStorage on initial render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, []);

  // Fetch post details for each cart item
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const allPosts = (await appwriteService.getPosts())?.documents || [];
        const cartPosts = allPosts.filter((p) => cart.includes(p.$id));
        setPosts(cartPosts);
      } catch (err) {
        console.error('Failed to fetch cart items:', err);
      } finally {
        setLoading(false);
      }
    };
    if (cart.length) fetchCartItems();
    else setLoading(false); // Stop loading if cart is empty
  }, [cart]);

  // Remove a specific post from the cart
  const removeFromCart = (id) => {
    const updated = cart.filter((cid) => cid !== id);
    localStorage.setItem('cart', JSON.stringify(updated)); // Update localStorage
    setCart(updated); // Update state
  };

  // Calculate total price
  const total = posts.reduce((sum, p) => sum + parseFloat(p.rate || 0), 0);

  return (
    <Container>
      <h1 className="text-2xl font-semibold my-6">Your Cart</h1>

      {/* Conditional rendering based on loading and cart state */}
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/* Display each item in the cart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <div key={post.$id} className="relative">
                <PostCard
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                  rate={post.rate}
                  dateAD={post.dateAD}
                />
                {/* Button to remove item from cart */}
                <button
                  onClick={() => removeFromCart(post.$id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                  title="Remove from cart"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Display total price */}
          <div className="mt-6 text-right">
            <span className="text-lg font-medium">Total: Rs. {total.toFixed(2)}</span>
          </div>
        </>
      )}
    </Container>
  );
}
