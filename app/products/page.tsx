"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Package } from "lucide-react";
import { Product, ProductFormData } from "@/components/types/products";
import ProductCard from "@/components/ui/ProductCard";
import ProductForm from "@/components/ui/ProductForm";
import DeleteConfirmModal from "@/components/ui/DeleteConfirm";
import { gsap } from "gsap";

// Initial sample products
const initialProducts: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
  },
  {
    id: "2",
    title: "Smart Watch Pro",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop",
    description:
      "Advanced smartwatch with health monitoring, GPS, and premium build quality.",
  },
  {
    id: "3",
    title: "Laptop Stand Aluminum",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=300&fit=crop",
    description:
      "Ergonomic aluminum laptop stand for better posture and workspace organization.",
  },
  {
    id: "4",
    title: "Mechanical Keyboard RGB",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=300&fit=crop",
    description:
      "Premium mechanical keyboard with RGB backlighting and tactile switches.",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({
    isOpen: false,
    product: null,
  });

  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, productsRef);

    return () => ctx.revert();
  }, [products]);

  // Handlers
  const handleCreateProduct = (data: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: data.title,
      price: parseFloat(data.price),
      image: data.image,
      description: data.description,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (data: ProductFormData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                title: data.title,
                price: parseFloat(data.price),
                image: data.image,
                description: data.description,
              }
            : product
        )
      );
      setEditingProduct(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setDeleteConfirm({ isOpen: false, product: null });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) setDeleteConfirm({ isOpen: true, product });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Package className="h-8 w-8 text-blue-400" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  Our Products
                </h1>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Discover our curated collection of premium products. Add, edit,
                or remove products with ease.
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>Add Your First Product</span>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  All Products ({products.length})
                </h2>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div
                ref={productsRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <ProductCard
                      product={product}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteConfirm}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleUpdateProduct : handleCreateProduct}
        onCancel={handleCloseForm}
        isOpen={isFormOpen}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        productTitle={deleteConfirm.product?.title || ""}
        onConfirm={() =>
          deleteConfirm.product && handleDeleteProduct(deleteConfirm.product.id)
        }
        onCancel={() => setDeleteConfirm({ isOpen: false, product: null })}
      />
    </div>
  );
}
