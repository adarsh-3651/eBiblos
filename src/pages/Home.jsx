import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    let filtered = [...posts];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => selectedCategories.includes(post.category));
    }

    // Filter by location
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(post => selectedLocations.includes(post.location));
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategories, selectedLocations, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
        <img src="logo.png" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-5xl font-bold">Simple is More</h1>
        </div>
      </div>

      {/* Main Content */}
      <Container>
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-6 px-2">
            {/* Search Box */}
            <div>
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full border rounded px-3 py-2 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Category</h2>
              <ul className="space-y-1 text-sm">
                {['Fiction', 'Non-Fiction', 'Science', 'Biography', 'Self-Help', "Children's Books"].map((category) => (
                  <li key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={category}
                      className="accent-blue-500"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <div className="flex flex-wrap gap-2">
                {['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Butwal', 'Chitwan'].map((location) => (
                  <button
                    key={location}
                    className={`px-3 py-1 border rounded hover:bg-gray-200 text-sm ${
                      selectedLocations.includes(location) ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => handleLocationChange(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Section */}
          <main className="w-full lg:w-3/4 px-2">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">
                {filteredPosts.length} results for books
              </p>
              <select className="border text-sm px-2 py-1 rounded-md shadow-sm">
                <option>Sort by Popular</option>
                <option>Sort by Newest</option>
                <option>Sort by Price</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center text-lg text-gray-600 animate-pulse">
                Loading adorable posts...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 font-medium">{error}</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center text-xl text-gray-500 font-semibold">
                No posts match the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                {filteredPosts.map((post) => (
                  <div
                    key={post.$id}
                    className="rounded-xl p-3 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white"
                  >
                    <PostCard
                      $id={post.$id}
                      title={post.title}
                      featuredImage={Array.isArray(post.featuredImage) ? post.featuredImage : [post.featuredImage]}
                      rate={post.rate}
                      dateAD={post.dateAD}
                    />
                    {/* <div className="mt-2 text-blue-600 text-sm font-semibold">
                      Rs {post.rate || 'N/A'}
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}

export default Home;
