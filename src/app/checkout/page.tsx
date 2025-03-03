"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    console.log("✅ Cart Before Saving:", cart.map(item => item.title));

    const checkoutData = {
      ...formData,  // 📝 User billing details
      products: cart // 🛒 Cart ke selected products
    };

    // ✅ Checkout Data + Cart Save in LocalStorage
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // Navigate to Payment Page
    router.push("/payment");
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
      {/* Left Side: Order Summary */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <p>{item.title} (x{item.quantity})</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-2" />
        <h3 className="text-lg font-semibold">
          Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </h3>
      </div>

      {/* Right Side: User Details Form */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <form className="space-y-3">
          <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 w-full"/>
          <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 w-full"/>
          <input type="text" name="address" placeholder="Address" required onChange={handleChange} className="border p-2 w-full"/>
          <input type="text" name="postalCode" placeholder="Postal Code" required onChange={handleChange} className="border p-2 w-full"/>
          <input type="text" name="country" placeholder="Country" required onChange={handleChange} className="border p-2 w-full"/>
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} className="border p-2 w-full"/>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="border p-2 w-full"/>
          <button type="button" onClick={handleProceedToPayment} className="bg-blue-600 text-white px-4 py-2 rounded">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
