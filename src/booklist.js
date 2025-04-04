import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const booksData = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 19.99,
    cover: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg'
  },
  {
    id: 2,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 14.99,
    cover: 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg'
  },
  // Add more books here...
];

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // You can replace this with fetch from an API or Firebase
    setBooks(booksData);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
