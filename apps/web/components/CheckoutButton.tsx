"use client";

import { useState } from "react";
import { API_BASE_URL } from "../utils/api";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  courseId: string;
  price: string;
  currency: string;
}

export default function CheckoutButton({ courseId, price, currency }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // In a real app, we'd get the JWT from a session provider
      // For this demo, we'll assume the user is logged in or prompt them
      const res = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Just a placeholder
        },
        body: JSON.stringify({
          courseId,
          region: 'US', // Default for demo
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || 'Failed to create checkout session. Please make sure you are logged in.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mb-6 flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        `Enroll for ${currency}${price}`
      )}
    </button>
  );
}
