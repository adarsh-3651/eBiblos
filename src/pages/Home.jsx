import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pastelColors = [
    'bg-pink-100', 'bg-blue-100', 'bg-green-100',
    'bg-yellow-100', 'bg-purple-100', 'bg-orange-100',
    'bg-teal-100', 'bg-rose-100', 'bg-indigo-100', 'bg-lime-100',
  ];

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
    <div className="w-full py-8 min-h-[75vh] bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <Container>
        {loading ? (
          <div className="text-center text-lg text-gray-600 animate-pulse">
            Loading adorable posts...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-xl text-gray-500 font-semibold">
            No posts yet... Login to start exploring!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-2 sm:px-0">
            {posts.map((post) => {
              const randomBg = pastelColors[Math.floor(Math.random() * pastelColors.length)];
              return (
                <div
                  key={post.$id}
                  className={`rounded-xl p-3 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ${randomBg} aspect-[3/4] min-w-0`}
                >
                  <PostCard
                    $id={post.$id}
                    title={post.title}
                    featuredImage={
                      Array.isArray(post.featuredImage)
                        ? post.featuredImage
                        : [post.featuredImage]
                    }
                    rate={post.rate}
                    dateAD={post.dateAD}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
