import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await authService.loginWithGoogle();
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-70"></div>

            <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-xl p-10 space-y-6">
                <div className="flex justify-center mb-6">
                    <Logo width="100px" />
                </div>

                <h2 className="text-center text-3xl font-bold text-white">Sign In</h2>
                <p className="text-center text-sm text-white/70">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-400 text-center text-sm">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="space-y-5">
                    <div className="space-y-4">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <div className="flex items-center justify-center my-4">
                    <span className="bg-white/30 w-1/3 h-[1px]"></span>
                    <span className="text-sm text-white/70 mx-3">OR</span>
                    <span className="bg-white/30 w-1/3 h-[1px]"></span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="flex items-center justify-center gap-3 px-6 py-3 w-full bg-white text-black rounded-lg hover:bg-gray-100 disabled:opacity-70"
                >
                    <img src="/images/google.png" alt="Google Logo" className="w-6 h-6" />
                    <span className="text-lg font-medium">
                        {loading ? "Processing..." : "Sign in with Google"}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Login;