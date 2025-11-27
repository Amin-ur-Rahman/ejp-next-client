"use client";

import { useState } from "react";

import {
  Menu,
  X,
  ChevronDown,
  User,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-md h-16 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading session...</p>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#111111]">
              <span className="text-[#8AC926]">Next</span>Store
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#111111] hover:text-[#8AC926] transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="text-[#111111] hover:text-[#8AC926] font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#8AC926] text-white px-5 py-2 rounded-lg hover:bg-[#7AB91F] transition-colors duration-200 font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-[#111111] hover:text-[#8AC926] transition-colors duration-200"
                >
                  <div className="w-9 h-9 bg-[#8AC926] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">
                    {session.user.name || session.user.email}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-[#F3F3F3]">
                    <div className="px-4 py-3 border-b border-[#F3F3F3]">
                      <p className="text-sm font-medium text-[#111111]">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs text-[#C7C7C7]">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Management Links */}
                    <Link
                      href="/add-product"
                      className="flex items-center px-4 py-2 text-[#111111] hover:bg-[#F3F3F3] transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Package className="w-4 h-4 mr-3 text-[#8AC926]" />
                      Add Product
                    </Link>
                    <Link
                      href="/manage-products"
                      className="flex items-center px-4 py-2 text-[#111111] hover:bg-[#F3F3F3] transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3 text-[#8AC926]" />
                      Manage Products
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-[#F3F3F3] transition-colors duration-200 border-t border-[#F3F3F3] mt-2"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#111111] hover:text-[#8AC926] transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#F3F3F3] pb-2">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-[#111111] hover:text-[#8AC926] font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="pt-3 space-y-2 border-t border-[#F3F3F3]">
                <Link
                  href="/login"
                  className="w-full block text-left text-[#111111] hover:text-[#8AC926] font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full block text-center bg-[#8AC926] text-white px-5 py-2 rounded-lg hover:bg-[#7AB91F] transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-3 space-y-2 border-t border-[#F3F3F3]">
                <div className="flex items-center space-x-3 pb-2">
                  <div className="w-9 h-9 bg-[#8AC926] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111111]">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-[#C7C7C7]">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/add-product"
                  className="flex items-center text-[#111111] hover:text-[#8AC926] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package className="w-4 h-4 mr-3 text-[#8AC926]" />
                  Add Product
                </Link>
                <Link
                  href="/manage-products"
                  className="flex items-center text-[#111111] hover:text-[#8AC926] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-3 text-[#8AC926]" />
                  Manage Products
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center text-red-600 hover:text-red-700 transition-colors duration-200 pt-2 border-t border-[#F3F3F3]"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
