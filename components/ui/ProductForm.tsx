"use client";

import { useState } from "react";
import { X, Save, Plus } from "lucide-react";
import { Product, ProductFormData } from "../types/products";
import toast from "react-hot-toast";

interface ProductFormProps {
  product?: Product | null;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function ProductForm({
  product,
  onSave,
  onCancel,
  isOpen,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: product?.title || "",
    price: product?.price.toString() || "",
    image: product?.image || "",
    description: product?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.price && formData.image) {
      onSave(formData);
      toast.success(
        product
          ? "Product updated successfully!"
          : "Product added successfully!"
      ); // ✅ Success toast
      setFormData({ title: "", price: "", image: "", description: "" });
    } else {
      toast.error("Please fill all required fields."); // ✅ Error toast
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="glass-morphism rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            {product ? (
              <Save className="h-6 w-6 text-blue-400" />
            ) : (
              <Plus className="h-6 w-6 text-green-400" />
            )}
            <span>{product ? "Edit Product" : "Add New Product"}</span>
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Product Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter product title"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Price (NPR) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter product description (optional)"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              {product ? (
                <Save className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              <span>{product ? "Update Product" : "Add Product"}</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
