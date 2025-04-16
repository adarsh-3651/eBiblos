import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        setPosts(response?.documents || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Something went wrong while fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-10 min-h-[75vh] bg-gray-100">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          Explore the Collection
        </h1>

        {loading ? (
          <div className="text-center">
            <h2 className="text-base text-gray-500">Loading posts...</h2>
          </div>
        ) : error ? (
          <div className="text-center">
            <h2 className="text-base text-red-500">{error}</h2>
            {/* Optionally, you can add a button to retry fetching */}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center">
            <h1 className="text-xl font-medium text-gray-600">
              No posts available. Login to buy.
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              >
                <PostCard
                  $id={post.$id}
                  title={post.title}
                  featuredImage={Array.isArray(post.featuredImage) ? post.featuredImage : [post.featuredImage]} // Normalize to array
                  rate={post.rate}
                  dateAD={post.dateAD}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
