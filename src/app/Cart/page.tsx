"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Cart() {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const router = useRouter();

  const increment = (id: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateCartItem(id, { quantity: item.quantity + 1 });
    }
  };

  const decrement = (id: number) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateCartItem(id, { quantity: item.quantity - 1 });
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-white shadow"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={20}
                    width={20}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => decrement(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h2 className="text-xl font-semibold">
              Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </h2>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
