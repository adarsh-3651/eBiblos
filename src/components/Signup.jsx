import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import googleLogo from "../google.jpg";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (!userData) {
                setError("Error creating account. Please try again.");
                return;
            }
            const userDetails = await authService.getCurrentUser();
            if (userDetails) {
                dispatch(login(userDetails));
                navigate("/");
            }
        } catch (error) {
            setError(error.message || "Something went wrong. Please try again.");
        }
    };

    const handleGoogleSignup = async () => {
        setError("");
        try {
            const response = await authService.loginWithGoogle();
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-100 relative">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Sign-Up Form */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-xl p-10 space-y-8 shadow-2xl backdrop-blur-lg">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link to="/">
                        <Logo width="80px" />
                    </Link>
                </div>

                <h2 className="text-center text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-center text-sm text-gray-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        className="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        className="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                        {...register("password", { required: true })}
                    />

                    {/* Sign Up Button */}
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Sign Up
                    </Button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center justify-center my-4">
                    <span className="bg-gray-300 w-1/3 h-[1px]"></span>
                    <span className="text-sm text-gray-500 mx-3">OR</span>
                    <span className="bg-gray-300 w-1/3 h-[1px]"></span>
                </div>

                {/* Google Sign Up Button */}
                <button
                    className="flex items-center justify-center gap-3 px-6 py-3 w-full bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                    onClick={handleGoogleSignup}
                >
                    <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
                    <span className="text-lg font-medium">Sign up with Google</span>
                </button>
            </div>
        </div>
    );
}

export default Signup;
