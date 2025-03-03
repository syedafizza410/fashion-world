"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4} from "uuid";

export default function OrderComplete() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log("🚀 Checkout Data:", parsedData); 
  
      // ✅ Ensure products field exists
      if (!parsedData.products || parsedData.products.length === 0) {
        console.error("❌ Products are missing in checkoutData!");
        return;
      }
  
      // ✅ Ensure required fields exist
      if (!parsedData.firstName || !parsedData.lastName || !parsedData.email || !parsedData.phone) {
        console.error("❌ Customer details are missing!");
        return;
      }
  
      // ✅ Corrected requestBody structure
      const requestBody = {
        email: parsedData.email, // ✅ Email
        customer: {
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          phone: parsedData.phone,
          address: parsedData.address || "Not Provided", // ✅ Added Address
          paymentMethod: parsedData.paymentMethod || "Not Provided", // ✅ Added Payment Method
        },
        products: parsedData.products, // ✅ Ensure this exists
      };
  
      console.log("📡 Sending order data:", JSON.stringify(requestBody, null, 2)); 
  
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then(async (res) => {
          const responseData = await res.json();
          console.log("✅ API Response:", responseData);
  
          if (!res.ok) {
            throw new Error(`Order API Error: ${responseData.error || "Unknown Error"}`);
          }
        })
        .catch((err) => console.error("❌ Order API Error:", err.message));
    }
  }, []);    
  
  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-3xl font-bold text-green-600">Order Complete!</h1>
      <p className="text-lg mt-4">You will receive a confirmation email shortly.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Return to Home
      </button>
    </div>
  );
}
