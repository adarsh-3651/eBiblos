import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Signup } from "../pages/Signup.jsx";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        console.log("Sign-Up form submitted:", data);
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
                navigate("/login");
            }
        } catch (error) {
            console.error("Sign-up error:", error);
            setError(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="relative w-full h-screen flex justify-center items-center bg-cover bg-center backdrop-blur-lg">
            {/* Background Blur Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>

            {/* Floating Glass Form */}
            <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-xl p-8 w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Logo width="80px" />
                </div>

                <h2 className="text-center text-2xl font-bold text-white">Sign Up</h2>
                <p className="mt-2 text-center text-sm text-gray-300">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-400 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        className="bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be valid",
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                        {...register("password", { required: true })}
                    />

                    {/* WOW Button */}
                    <Button
                        type="submit"
                        className="w-full text-white text-lg font-semibold py-3 px-5 rounded-lg transition-all duration-300 
                            bg-gradient-to-r from-blue-500 to-purple-600 
                            hover:from-purple-600 hover:to-blue-500 
                            shadow-lg transform hover:scale-105"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
export default Signup;
