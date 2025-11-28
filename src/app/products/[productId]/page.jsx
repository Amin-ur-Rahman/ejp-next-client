"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Shield,
  Truck,
  Star,
} from "lucide-react";
import Image from "next/image";

const ProductDetails = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axios.get(
        `https://ejp-next0server-1.onrender.com/${productId}`
      );
      return res.data;
    },
  });

  console.log(product);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F3F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-[#C7C7C7]/30 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-[#C7C7C7]/30 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-10 bg-[#C7C7C7]/30 rounded w-3/4"></div>
                <div className="h-6 bg-[#C7C7C7]/30 rounded w-1/2"></div>
                <div className="h-20 bg-[#C7C7C7]/30 rounded"></div>
                <div className="h-12 bg-[#C7C7C7]/30 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#C7C7C7] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#111111] mb-2">
            Product Not Found
          </h2>
          <p className="text-[#C7C7C7] mb-6">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-[#8AC926] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7AB91F] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Back Button */}
      <div className="bg-white border-b border-[#C7C7C7]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-[#111111] hover:text-[#8AC926] transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </a>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
                {product.image_url ? (
                  <Image
                    width={500}
                    height={400}
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[500px] flex items-center justify-center bg-[#F3F3F3]">
                    <Package className="w-24 h-24 text-[#C7C7C7]" />
                  </div>
                )}

                {/* Stock Badge */}
                {!product.is_available && (
                  <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    Out of Stock
                  </div>
                )}
                {product.is_available && product.stock_quantity < 10 && (
                  <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    Only {product.stock_quantity} left!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-[#8AC926] text-white text-sm font-semibold px-4 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-[#111111] leading-tight">
              {product.name}
            </h1>

            {/* Rating (Placeholder) */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#8AC926] fill-[#8AC926]"
                  />
                ))}
              </div>
              <span className="text-[#C7C7C7] text-sm">(125 reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-[#8AC926]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[#C7C7C7] text-sm">USD</span>
              </div>
              <div className="mt-2">
                {product.is_available ? (
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    In Stock - {product.stock_quantity} available
                  </p>
                ) : (
                  <p className="text-red-600 font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Currently Unavailable
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-[#111111] mb-3">
                Product Description
              </h2>
              <p className="text-[#C7C7C7] leading-relaxed">
                {product.short_description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* Product Meta Info */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-[#111111] mb-4">
                Product Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#F3F3F3]">
                  <span className="text-[#C7C7C7]">Product ID</span>
                  <span className="font-medium text-[#111111]">
                    {product.product_id}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F3F3F3]">
                  <span className="text-[#C7C7C7]">Category</span>
                  <span className="font-medium text-[#111111]">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F3F3F3]">
                  <span className="text-[#C7C7C7]">Availability</span>
                  <span
                    className={`font-medium ${
                      product.is_available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.is_available ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#C7C7C7]">Stock Quantity</span>
                  <span className="font-medium text-[#111111]">
                    {product.stock_quantity} units
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={!product.is_available}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${
                product.is_available
                  ? "bg-[#8AC926] text-white hover:bg-[#7AB91F] hover:shadow-xl"
                  : "bg-[#C7C7C7] text-white cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {product.is_available ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 text-[#111111]">
                <div className="w-12 h-12 bg-[#8AC926]/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#8AC926]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-[#C7C7C7]">On orders $50+</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#111111]">
                <div className="w-12 h-12 bg-[#8AC926]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#8AC926]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <p className="text-xs text-[#C7C7C7]">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#111111]">
                <div className="w-12 h-12 bg-[#8AC926]/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#8AC926]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-[#C7C7C7]">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
