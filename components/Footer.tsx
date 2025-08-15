"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Instagram,
  Mail,
  ArrowUp,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900  border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
          <div className="flex flex-col space-y-4 md:w-1/2">
            <h3 className="text-xl font-bold text-white">ModernStore</h3>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Premium products for the modern lifestyle. Curated collections
              designed for those who appreciate quality and innovation.
            </p>
            <div className="flex space-x-3 mt-2">
              <Link
                href="/"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              >
                <Instagram className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>

              <Link
                href="/"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              >
                <Facebook className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>

              <Link
                href="/"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              >
                <Mail className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-2 md:w-1/4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2025 ModernStore. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 mt-2 sm:mt-0 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
