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
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [validTill, setValidTill] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => selectedCategories.includes(post.category));
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(post => selectedLocations.includes(post.location));
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    if (locationSearchTerm.trim() !== '') {
      filtered = filtered.filter(post =>
        post.location?.toLowerCase().includes(locationSearchTerm.trim().toLowerCase())
      );
    }

    if (minPrice !== '') {
      filtered = filtered.filter(post =>
        !isNaN(post.rate) && Number(post.rate) >= Number(minPrice)
      );
    }

    if (maxPrice !== '') {
      filtered = filtered.filter(post =>
        !isNaN(post.rate) && Number(post.rate) <= Number(maxPrice)
      );
    }

    if (validTill !== '') {
  const selectedDate = new Date(validTill);
  filtered = filtered.filter(post => {
    if (!post.validTill) return false;
    const postDate = new Date(post.validTill);

    // DEBUGGING - remove this after testing
    // console.log("Checking post:", post.title, "validTill:", post.validTill, "as date:", postDate);

    return (
      !isNaN(postDate.getTime()) &&
      postDate.setHours(0, 0, 0, 0) >= selectedDate.setHours(0, 0, 0, 0)
    );
  });
}


    setFilteredPosts(filtered);
  }, [
    posts,
    selectedCategories,
    selectedLocations,
    searchTerm,
    locationSearchTerm,
    minPrice,
    maxPrice,
    validTill
  ]);

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
    <div className="w-full bg-gray-50 flex flex-col">
      <div className="lg:flex w-full gap-4 flex-grow">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden px-2 mb-4 w-full">
          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter Sidebar */}
        <aside className={`w-full lg:w-1/6 px-4 py-4 bg-white shadow-md rounded-md space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          {/* Search by Title */}
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
            <input
              type="text"
              placeholder="Search location..."
              className="w-full border rounded px-3 py-2 text-sm mb-2"
              value={locationSearchTerm}
              onChange={(e) => setLocationSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Butwal', 'Chitwan'].map((location) => (
                <button
                  key={location}
                  className={`px-3 py-1 border rounded hover:bg-gray-200 text-sm ${
                    selectedLocations.includes(location) ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => handleLocationChange(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Price</h2>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded px-2 py-1 text-sm"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded px-2 py-1 text-sm"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Valid Till Filter
          <div>
            <h2 className="text-lg font-semibold mb-2">Valid Till</h2>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
            />
          </div> */}
        </aside>

        {/* Posts Grid */}
        <main className="w-full lg:w-5/6 px-2 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm">
              {filteredPosts.length} results for books
            </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredPosts.slice(0, 50).map((post) => (
                <div
                  key={post.$id}
                  className="rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white"
                >
                  <PostCard
                    $id={post.$id}
                    title={post.title}
                    featuredImage={Array.isArray(post.featuredImage) ? post.featuredImage : [post.featuredImage]}
                    rate={post.rate}
                    dateAD={post.dateAD}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
