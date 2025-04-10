import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  // Initialize the form with default values (if updating an existing post, pre-populate the fields)
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [imageUrl, setImageUrl] = useState("");

  // Function to load the preview image from Appwrite
  const loadPreviewImage = async () => {
    if (post?.featuredImage) {
      try {
        const preview = await appwriteService.getFilePreview(post.featuredImage);
        setImageUrl(preview?.href || "");
      } catch (error) {
        console.error("Error loading image preview:", error);
      }
    }
  };

  useEffect(() => {
    loadPreviewImage();
  }, [post?.featuredImage]);

  // The submit function handles both post creation and updating.
  const submit = async (data) => {
    try {
      let file;
      // Check if a new image file is provided
      if (data.image && data.image[0]) {
        file = await appwriteService.uploadFile(data.image[0]);
        // If updating an existing post, remove the previous image.
        if (post && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      const postData = {
        ...data,
        featuredImage: file ? file.$id : post?.featuredImage,
        userId: userData.$id,
      };

      let dbPost;
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, postData);
      } else {
        dbPost = await appwriteService.createPost(postData);
      }

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  // A helper function to generate a slug from the title.
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit(submit)} 
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Section */}
        <div className="flex flex-col">
          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Enter slug"
            className="mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {/* Preview image if available */}
          {imageUrl && (
            <div className="w-full mb-4">
              <img
                src={imageUrl}
                alt={post?.title || "Preview"}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            {...register("status", { required: true })}
          />
          
          <Button 
            type="submit" 
            className="w-full text-white text-lg font-semibold py-3 px-5 rounded-lg transition-all duration-300 
              bg-gradient-to-r from-blue-500 to-purple-600 
              hover:from-purple-600 hover:to-blue-500 
              shadow-lg transform hover:scale-105"
          >
            {post ? "Update Post" : "Submit Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
