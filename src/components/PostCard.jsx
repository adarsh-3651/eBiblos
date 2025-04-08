import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config"; // adjust path
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await appwriteService.getFilePreview(featuredImage);
        setImageUrl(result); // FilePreview object has .href
        console.log("Image URL:", result.href);
      } catch (error) {
        console.error("Failed to fetch image preview:", error);
      }
    };

    if (featuredImage) {
      fetchImage();
    }
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl w-full max-h-64 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 rounded-xl flex justify-center items-center">
              <span className="text-gray-600">Loading image...</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
