// src/components/AddToCartButton.tsx
"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity?: number;
  onAdd?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  onAdd,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
    });

    toast.success(`${product.title} added to cart!`);

    if (onAdd) onAdd();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="
        w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg 
        hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
        transition-colors duration-300
      "
      aria-label={`Add ${product.title} to cart`}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
