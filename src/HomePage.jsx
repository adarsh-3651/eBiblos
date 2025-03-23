import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Sample book data
  const books = [
    { id: 1, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 2, title: 'Squid game', price: 1200, rating: 4.5, image: '/book-cover-2.jpg' },
    { id: 3, title: 'Money Book', price: 1200, rating: 4.5, image: '/book-cover-3.jpg' },
    { id: 4, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 5, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 6, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 7, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 8, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 9, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
    { id: 10, title: 'Jungle Book', price: 1200, rating: 4.5, image: '/book-cover-1.jpg' },
  ];

  // Render 5 star rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-2">{rating}</span>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header/Navigation */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <span className="bg-red-500 text-white px-2 py-1">E-biblos</span>
          </div>
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 p-2"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="border border-gray-300 px-4 py-2">Filter</button>
          <button className="border border-gray-300 px-4 py-2">Profile</button>
          <Link to="/login" className="border border-gray-300 px-4 py-2">Login</Link>
          <Link to="/reader" className="border border-gray-300 px-4 py-2">Reader</Link>
          <button className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Recommended Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recommemded for you</h2>
          <button className="text-sm">See all</button>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {books.slice(0, 5).map((book) => (
            <div key={book.id} className="border border-gray-200 p-2 relative">
              <div className="mb-2 h-40 bg-gray-100 flex items-center justify-center">
                <img 
                  src={`/api/placeholder/180/160`} 
                  alt={book.title} 
                  className="max-h-full max-w-full object-cover"
                />
              </div>
              <div className="mb-1">
                <h3 className="font-medium">{book.title}</h3>
                <p className="font-bold">Rs.{book.price}</p>
              </div>
              <div className="flex justify-between items-center">
                {renderRating(book.rating)}
                <button className="bg-white border rounded-full p-1 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row of Books */}
      <div className="grid grid-cols-5 gap-4">
        {books.slice(5, 10).map((book) => (
          <div key={book.id} className={`border border-gray-200 p-7 relative ${book.id === 7 ? 'border-blue-500 border-2' : ''}`}>
            <div className="mb-2 h-40 bg-gray-100 flex items-center justify-center">
              <img 
                src={`/api/placeholder/180/160`} 
                alt={book.title} 
                className="max-h-full max-w-full object-cover"
              />
            </div>
            <div className="mb-1">
              <h3 className="font-medium">{book.title}</h3>
              <p className="font-bold">Rs.{book.price}</p>
            </div>
            <div className="flex justify-between items-center">
              {renderRating(book.rating)}
              <button className="bg-white border rounded-full p-2 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;