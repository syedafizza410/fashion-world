// src/pages/Cart.tsx or src/app/cart/page.tsx
"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, updateCartItem, clearCart } = useCart();

  const WHATSAPP_NUMBER = "+12043334556"; // Replace with your WhatsApp number

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateWhatsAppURL = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let message = "Hello, I would like to purchase the following products:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(
        2
      )}\n`;
    });

    message += `\nTotal: $${totalPrice.toFixed(2)}\n\nPlease confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  const handleProceedToCheckout = () => {
    const url = generateWhatsAppURL();
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="mr-4"
                />
                <div>
                  <h2 className="text-lg">{item.title}</h2>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateCartItem(item.id, { quantity: item.quantity - 1 })}
                  disabled={item.quantity === 1}
                  className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 disabled:bg-gray-400"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}
                  className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={handleProceedToCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
            <Link href="/">
              <button
                onClick={clearCart}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Clear Cart
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}