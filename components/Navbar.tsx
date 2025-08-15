"use client";

import Link from "next/link";
import { ShoppingCart, Package, Home } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "./store/cartstore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <nav className="glass-morphism sticky top-0 z-50 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold gradient-text">ModernShop</span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/products"
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Products</span>
              </Link>
            </div>
          </div>

          <Link href={"/cart"} className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-700/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/90 backdrop-blur-sm">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Products</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
