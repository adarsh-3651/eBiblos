import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title = "Untitled Post", featuredImage = [], rate, dateAD }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      // Optionally handle the case when no images are provided
      setImageUrls(["/path/to/default-placeholder-image.jpg"]);
    }
  }, [featuredImage]);

  // Slideshow logic
  useEffect(() => {
    if (imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % imageUrls.length);
      }, 3000); // 3 seconds per slide

      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
        <div className="w-full mb-3 rounded-lg overflow-hidden relative h-56">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${title} ${idx}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Loading images...
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        {rate && (
          <p className="text-sm text-gray-600 mt-1">
            Rate: <span className="font-medium">Rs. {parseFloat(rate).toFixed(2)}</span>
          </p>
        )}
        {dateAD && (
          <p className="text-xs text-gray-500 mt-1">Valid Till : {dateAD}</p>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
