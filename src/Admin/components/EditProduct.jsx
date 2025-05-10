// Admin/components/EditProduct.jsx

import React, { useEffect, useState } from "react";
import service from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate("/login");
          return;
        }

        // 🟢 Fetch ALL posts (No filter)
        const postList = await service.getPosts();
        setPosts(postList.documents);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [navigate]);

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const success = await service.deletePost(postId);
      if (success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== postId));
        alert("Post deleted successfully.");
      } else {
        alert("Failed to delete the post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
      alert("An error occurred while deleting the post.");
    }
  };

  if (loading) return <div className="p-6">Loading all products...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All Products (Admin View)</h1>

      {posts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.$id}
              className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                <p className="text-sm text-gray-600">Rate: Rs. {post.rate}</p>
                <p className="text-sm text-gray-600">User ID: {post.userId}</p> {/* Optional: See owner */}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/editpost/${post.$id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.$id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditProduct;
