"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Chrome } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (result.error) {
        if (result.error.includes("Passwords do not match")) {
          setError("Invalid email or password.");
        } else if (result.error.includes("No user found")) {
          setError("Invalid email or password.");
        } else {
          setError(result.error);
        }
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign In
        </h2>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
        >
          <Chrome className="w-5 h-5 text-red-500" />
          <span>Sign in with Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-lime-500 focus:border-lime-500 transition duration-150 text-black"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-lime-500 focus:border-lime-500 transition duration-150 text-black"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white transition duration-200 ${
              loading
                ? "bg-lime-400 cursor-not-allowed"
                : "bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-lime-500/50"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-lime-600 hover:text-lime-500"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
