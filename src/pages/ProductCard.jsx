import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Fetch post and images
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    const images = Array.isArray(post.featuredImage) ? post.featuredImage : [post.featuredImage];
                    appwriteService.getFilePreviews(images)
                        .then((urls) => {
                            const cleanUrls = urls.map(img => (typeof img === 'string' ? img : img?.href));
                            setImagePreviews(cleanUrls);
                        })
                        .catch((err) => console.error("Image preview error:", err));
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Carousel auto-transition
    useEffect(() => {
        if (imagePreviews.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % imagePreviews.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [imagePreviews]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                const images = Array.isArray(post.featuredImage) ? post.featuredImage : [post.featuredImage];
                images.forEach(id => appwriteService.deleteFile(id));
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {/* Image Carousel Section */}
                    <div className="relative border rounded-xl p-2 w-full md:w-[45%] h-[400px] overflow-hidden flex items-center justify-center bg-white">
                        {imagePreviews.length > 0 ? (
                            imagePreviews.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`Post image ${idx}`}
                                    className={`absolute top-0 left-0 w-full h-full object-contain rounded-xl transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                />
                            ))
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                Loading images...
                            </div>
                        )}
                        {isAuthor && (
                            <div className="absolute right-4 top-4 z-20">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-2">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                            </div>
                        )}
                    </div>
    
                    {/* Post Details Section */}
                    <div className="w-full md:w-[55%] space-y-3">
                        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                        <p className="text-gray-600 text-lg">Category: <span className="font-medium">{post.category}</span></p>
                        <p className="text-gray-600 text-lg">Price (Rate): <span className="font-medium">Rs. {parseFloat(post.rate).toFixed(2)}</span></p>
                        <p className="text-gray-600 text-lg">Valid Till (AD): <span className="font-medium">{post.dateAD}</span></p>
                        <p className="text-gray-600 text-lg">Status: <span className="font-medium">{post.status}</span></p>
                        <p className="text-gray-600 text-lg">Posted By: <span className="font-medium">{post.postedBy || "Unknown"}</span></p>
                    </div>
                </div>
    
                {/* Description Section */}
                <div className="mt-6 border-t pt-4 browser-css text-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Description:</h2>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}    