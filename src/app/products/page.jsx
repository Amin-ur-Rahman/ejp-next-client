"use client";

import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("http://localhost:4000/all-products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  // Categories for the filter (UI only)
  const categories = [
    "All Categories",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Hero Section */}
      <div className="bg-white py-12 border-b border-[#C7C7C7]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
              Our Products
            </h1>
            <p className="text-lg text-[#C7C7C7]">
              Browse through our amazing collection of quality products. Find
              exactly what you need with great prices and fast shipping.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white py-6 border-b border-[#C7C7C7]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#C7C7C7]" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-[#C7C7C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC926] focus:border-[#8AC926] transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#C7C7C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC926] focus:border-[#8AC926] transition-all duration-200 bg-white cursor-pointer"
              >
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category.toLowerCase().replace(/ /g, "-")}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products === null ? (
          // Loading State
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-[#C7C7C7]/30"></div>
                <div className="p-6">
                  <div className="h-6 bg-[#C7C7C7]/30 rounded mb-3"></div>
                  <div className="h-4 bg-[#C7C7C7]/30 rounded mb-2"></div>
                  <div className="h-4 bg-[#C7C7C7]/30 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-[#C7C7C7]/30 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          // No Products State
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-[#C7C7C7] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-[#111111] mb-2">
              No Products Found
            </h3>
            <p className="text-[#C7C7C7]">
              We couldn't find any products. Please try again later.
            </p>
          </div>
        ) : (
          // Products Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-[#F3F3F3]">
                  {product.image_url ? (
                    <Image
                      height={500}
                      width={400}
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingCart className="w-16 h-16 text-[#C7C7C7]" />
                    </div>
                  )}
                  {/* Stock Badge */}
                  {product.stock_quantity > 0 &&
                    product.stock_quantity < 10 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Only {product.stock_quantity} left
                      </div>
                    )}
                  {!product.is_available && (
                    <div className="absolute top-3 left-3 bg-[#C7C7C7] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-[#8AC926] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#111111] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#111111] mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[#C7C7C7] text-sm mb-4 line-clamp-2">
                    {product.short_description ||
                      "No description available for this product."}
                  </p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#8AC926]">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="text-xs text-[#C7C7C7] mt-1">
                        {product.is_available ? (
                          <span className="text-green-600 font-medium">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={`/products/${product._id}`}
                      className="inline-flex items-center gap-2 bg-[#8AC926] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#7AB91F] transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
