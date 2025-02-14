"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderComplete() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      const parsedData = JSON.parse(data);
      setCheckoutData(parsedData);

      // Send Confirmation Email
      fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsedData.email, orderDetails: parsedData }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Email Response:", data))
        .catch((err) => console.error("Email Error:", err));

      // Send WhatsApp Message to Owner
      fetch("/api/sendWhatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderDetails: parsedData }),
      })
        .then((res) => res.json())
        .then((data) => console.log("WhatsApp Response:", data))
        .catch((err) => console.error("WhatsApp Error:", err));
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
