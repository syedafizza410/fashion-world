"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const router = useRouter();
  const { cart } = useCart();
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const storedCheckoutData = localStorage.getItem("checkoutData");
  
    if (storedCheckoutData) {
      const parsedData = JSON.parse(storedCheckoutData);
      setCheckoutData(parsedData);
      console.log("📦 Checkout Data Retrieved:", parsedData);
    } else {
      console.error("🚨 Checkout Data is missing in Payment Page!");
    }
  }, []);   

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      console.error("Payment Error:", error);
    } else {
      console.log("Stripe Payment Method:", paymentMethod);
      router.push("/order-complete");
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
      {/* Left Side: Order Summary + User Details */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        
        {/* User Details */}
        {checkoutData && (
          <>
            <p><strong>Name:</strong> {checkoutData.firstName} {checkoutData.lastName}</p>
            <p><strong>Address:</strong> {checkoutData.address}, {checkoutData.postalCode}, {checkoutData.country}</p>
            <p><strong>Phone:</strong> {checkoutData.phone}</p>
            <p><strong>Email:</strong> {checkoutData.email}</p>
          </>
        )}

        <hr className="my-4" />

        {/* Cart Items */}
        <h3 className="text-lg font-semibold mb-2">Your Products</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <p>{item.title} (x{item.quantity})</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-2" />
        <h3 className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      {/* Right Side: Payment Options */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="payment" 
              value="card" 
              checked={paymentMethod === "card"} 
              onChange={() => setPaymentMethod("card")} 
            />
            <span>Credit/Debit Card</span>
          </label>

          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="payment" 
              value="cod" 
              checked={paymentMethod === "cod"} 
              onChange={() => setPaymentMethod("cod")} 
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <hr className="my-4" />

        {/* Stripe Payment Form */}
        {paymentMethod === "card" && (
          <form onSubmit={handlePayment}>
            <CardElement className="border p-2 rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-3" disabled={!stripe}>
              Pay with Card
            </button>
          </form>
        )}

        {/* Cash on Delivery Button */}
        {paymentMethod === "cod" && (
          <button 
            onClick={() => router.push("/order-complete")} 
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-3"
          >
            Pay on Delivery
          </button>
        )}
      </div>
    </div>
  );
}
