//Sign up page

import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
            <form onSubmit={handleSignup}>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Sign up
            </button>
            </form>
            <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
                Login
            </Link>
            </p>
        </div>
        </div>
    );
    }