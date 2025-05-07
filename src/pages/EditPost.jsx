// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostForm, Container } from "../components";

const EditPost = () => {
  const { postId } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // React Router navigation function

  const [post, setPost] = useState(null); // Store the fetched post data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch post data on component mount
  useEffect(() => {
    const loadPost = async () => {
      try {
        // If no postId, redirect to dashboard
        if (!postId) return navigate("/dashboard");

        // Fetch the post using the Appwrite service
        const postData = await appwriteService.getPost(postId);

        // If post not found, redirect to dashboard
        if (!postData) return navigate("/dashboard");

        // Get preview URLs for the featured images
        const previewURLs = await appwriteService.getFilePreviews(postData.featuredImage || []);

        // Store post data with image previews in state
        setPost({
          ...postData,
          previewImages: previewURLs,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
        navigate("/dashboard"); // Redirect on error
      } finally {
        setLoading(false); // End loading
      }
    };

    loadPost(); // Call async function
  }, [postId, navigate]);

  // Render loading screen
  if (loading) return <div className="p-6">Loading post...</div>;

  // Render form if post is found, else show error
  return post ? (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      <PostForm post={post} />
    </Container>
  ) : (
    <div className="p-6 text-center text-red-500">Post not found.</div>
  );
};

export default EditPost;
