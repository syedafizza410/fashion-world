"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Cart() {
  const { cart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Image src={item.image} alt={item.title} width={64} height={64} className="mr-4" />
                <div>
                  <h2 className="text-lg">{item.title}</h2>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <span className="mx-2">Qty: {item.quantity}</span>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={handleProceedToCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
