"use client";
import { Edit, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "../types/products";
import { useCartStore } from "../store/cartstore";
import toast from "react-hot-toast"; // ✅ Import toast

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`"${product.title}" added to cart 🛒`, {
      position: "top-right",
    }); // ✅ Toast after adding
  };

  return (
    <div className="glass-morphism rounded-2xl overflow-hidden card-hover group h-full flex flex-col">
      <div className="relative h-48 bg-gray-800 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-lg"
            title="Edit Product"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 min-h-[3.5rem] flex items-start">
          {product.title}
        </h3>

        <div className="mb-4 flex-grow">
          {product.description && (
            <p className="text-gray-400 text-sm line-clamp-3">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold gradient-text">
            NPR. {product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg min-w-[120px]"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
