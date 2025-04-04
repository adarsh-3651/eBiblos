import React, { useState } from 'react';

const BookReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert("Please give a rating and write a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      comment
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setHover(0);
    setComment('');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const star = index + 1;
          return (
            <button
              type="button"
              key={index}
              className={`text-2xl ${
                star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          );
        })}
      </div>

      {/* Review Input */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts about the book..."
          className="w-full p-3 border rounded mb-3"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="mb-4 border-b pb-2">
              <div className="text-yellow-400 mb-1">
                {'★'.repeat(rev.rating)}{' '}
                <span className="text-gray-300">
                  {'★'.repeat(5 - rev.rating)}
                </span>
              </div>
              <p className="text-gray-800">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookReview;
