"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiPackage,
  FiDollarSign,
  FiHash,
  FiImage,
  FiTag,
  FiFileText,
} from "react-icons/fi";

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      product_id: "",
      name: "",
      category: "",
      price: "",
      stock_quantity: "",
      is_available: true,
      image_url: "",
      short_description: "",
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (productData) => {
      const response = await axios.post(
        "https://ejp-next0server-1.onrender.com/add-product",
        {
          ...productData,
          price: parseFloat(productData.price),
          stock_quantity: parseInt(productData.stock_quantity),
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      reset();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message || "Product added successfully",
        confirmButtonColor: "#84cc16",
        confirmButtonText: "Great!",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "something went wrong, please try again",
      });
    },
  });

  const onSubmit = (data) => {
    addProductMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-lime-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-500 rounded-full mb-4">
              <FiPackage className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Add New Product
            </h1>
            <p className="text-gray-600 mt-2">
              Fill in the details to add a product to inventory
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FiHash className="mr-2 text-lime-500" />
                  Product ID
                </label>
                <input
                  type="text"
                  {...register("product_id", {
                    required: "Product ID is required",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition text-black"
                  placeholder="P001"
                />
                {errors.product_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.product_id.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FiTag className="mr-2 text-lime-500" />
                  Product Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition text-black"
                  placeholder="Wireless Mechanical Keyboard"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FiPackage className="mr-2 text-lime-500" />
                  Category
                </label>
                <input
                  type="text"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition text-black"
                  placeholder="Electronics"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FiDollarSign className="mr-2 text-lime-500" />
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition text-black"
                  placeholder="129.99"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FiHash className="mr-2 text-lime-500" />
                  Stock Quantity
                </label>
                <input
                  type="number"
                  {...register("stock_quantity", {
                    required: "Stock quantity is required",
                    min: { value: 0, message: "Stock must be non-negative" },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition text-black"
                  placeholder="45"
                />
                {errors.stock_quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stock_quantity.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("is_available")}
                    className="w-5 h-5  text-lime-500 border-2 border-gray-300 rounded focus:ring-lime-500"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-700">
                    Product Available
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiImage className="mr-2 text-lime-500" />
                Image URL
              </label>
              <input
                type="url"
                {...register("image_url", {
                  required: "Image URL is required",
                })}
                className="w-full text-black px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition"
                placeholder="https://images.unsplash.com/photo-..."
              />
              {errors.image_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image_url.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiFileText className="mr-2 text-lime-500" />
                Short Description
              </label>
              <textarea
                {...register("short_description", {
                  required: "Description is required",
                })}
                rows="4"
                className="text-black w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:outline-none transition resize-none"
                placeholder="Tactile precision with clicky switches and multi-device Bluetooth connectivity."
              />
              {errors.short_description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.short_description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={addProductMutation.isPending}
              className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {addProductMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding Product...
                </>
              ) : (
                <>
                  <FiPackage className="mr-2" />
                  Add Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
