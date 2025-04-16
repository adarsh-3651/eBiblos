import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

// If google.jpg is inside the public folder, use "/google.jpg"
import googleLogo from "../google.jpg"; 

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            const response = await authService.loginWithGoogle();
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-ice-blue-50 relative">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-xl p-10 space-y-8 shadow-2xl backdrop-blur-lg">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link to="/">
                         <Logo width="80px" />
                    </Link>
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-800">Sign In</h2>
                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div className="space-y-5">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-black border-2 border-black rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                            {...register("password", { required: "Password is required" })}
                        />
                    </div>

                    {/* Sign-In Button */}
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Sign In
                    </Button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center justify-center my-4">
                    <span className="bg-gray-300 w-1/3 h-[1px]"></span>
                    <span className="text-sm text-gray-500 mx-3">OR</span>
                    <span className="bg-gray-300 w-1/3 h-[1px]"></span>
                </div>

                {/* Google Sign-In Button */}
                <button
                    className="flex items-center justify-center gap-3 px-6 py-3 w-full bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                    onClick={handleGoogleLogin}
                >
                    <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
                    <span className="text-lg font-medium">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}

export default Login;
