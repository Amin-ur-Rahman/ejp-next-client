"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Import signIn for Google
import { Chrome, ChromeIcon } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Client-side password validation (optional but good practice)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, now attempt to sign the user in immediately
        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });

        if (result.error) {
          // If sign-in fails after successful registration (rare), redirect to login
          router.push("/login?success=registered");
        } else {
          // Successful registration AND sign-in
          router.push("/");
        }
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for Google Login (shared logic)
  const handleGoogleLogin = () => {
    // Calling signIn with the provider name 'google' initiates the OAuth flow
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Create Account
        </h2>

        {/* Google Sign-up Button (Same button as login) */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
        >
          <ChromeIcon className="w-5 h-5 text-red-500" />
          <span>Sign up with Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or create an account manually
            </span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-lime-500 focus:border-lime-500 transition duration-150 text-black"
            />
          </div>
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
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-lime-500 focus:border-lime-500 transition duration-150"
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
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-lime-600 hover:text-lime-500"
          >
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
