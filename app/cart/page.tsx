"use client";

import { useCartStore } from "@/components/store/cartstore";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <ShoppingBag className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">
              {items.length} {items.length === 1 ? "Item" : "Items"} in Cart
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white">Shopping</span>
            <span className="block gradient-text">Cart</span>
          </h1>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-8">
                Looks like you haven't added any items to your cart yet
              </p>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <span>Browse Products</span>
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="glass-morphism rounded-xl p-6 hover:bg-gray-800/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-start sm:items-center">
                    <div className="relative w-full sm:w-32 h-32 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-2xl font-bold gradient-text mb-4">
                        NPR. {item.price.toFixed(2)}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-2 w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4 text-gray-400" />
                          </button>

                          <span className="text-white font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center space-x-2 p-2 hover:bg-red-900/20 hover:text-red-400 text-gray-400 rounded-lg transition-colors group"
                        >
                          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass-morphism rounded-xl p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>
                      Subtotal ({items.length}{" "}
                      {items.length === 1 ? "item" : "items"})
                    </span>
                    <span>NPR. {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>NPR. 0.00</span>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-white">
                        Total
                      </span>
                      <span className="text-3xl font-bold gradient-text">
                        NPR. {getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[0.98]">
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 py-3 rounded-xl font-medium transition-all duration-300"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
