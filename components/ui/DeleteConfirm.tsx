"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  productTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  productTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="glass-morphism rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">Delete Product</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">"{productTitle}"</span>?
          This action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            Delete Product
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
