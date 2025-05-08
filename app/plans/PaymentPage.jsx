import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ApiServices from "../../lib/ApiServeces"; // Fixed typo in import

const PaymentPage = ({ plan, price }) => {
  const [status, setStatus] = useState("idle"); // idle, loading, redirecting, error
  const [error, setError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  
  const BASE_URL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  const successUrl = `${BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${BASE_URL}/`;

  useEffect(() => {
    let isMounted = true;
    let redirectTimeout;

    const initiatePayment = async () => {
      if (!isMounted) return;
      setStatus("loading");
      
      try {
        // Validate required data
        if (!user?._id) {
          setError("User not authenticated");
          setStatus("error");
          return;
        }
        
        if (!plan?._id) {
          setError("Invalid plan details");
          setStatus("error");
          return;
        }

        const data = {
          planId: plan._id,
          userPrice: price,
          successUrl,
          cancelUrl,
          userId: user._id,
          userEmail: user.email,
        };
        
        console.log("Initiating payment with plan:", plan);
        
        // Store pending subscription info before API call
        // This ensures the data is stored even if redirect happens quickly
        localStorage.setItem(
          "pendingSubscription",
          JSON.stringify({
            planId: plan._id,
            planDetails: plan,
            timestamp: new Date().toISOString(),
          })
        );
        
        const res = await ApiServices.upgradePlan(data);
        
        // If component has been unmounted, don't proceed
        if (!isMounted) return;
        
        const resData = res.data;
        
        if (resData.success && resData.checkoutUrl) {
          setStatus("redirecting");
          setIsRedirecting(true);
          
          // Allow UI to update before redirect
          redirectTimeout = setTimeout(() => {
            if (isMounted) {
              // Use window.location for more reliable redirects to external domains
              window.location.href = resData.checkoutUrl;
            }
          }, 500);
        } else {
          throw new Error(resData.message || "Invalid checkout response");
        }
      } catch (err) {
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        // Special handling for network errors that might occur during redirect
        if (err.message === "Network Error" && isRedirecting) {
          // This is likely happening during the redirect - we can ignore it
          console.log("Network error during redirect, this is expected");
          return;
        }
        
        // Improved error handling for other cases
        const errorMessage = err?.response?.data?.message || err?.message || String(err);
        console.error("Payment initiation error:", errorMessage);
        setError(`Payment initiation failed: ${errorMessage}`);
        setStatus("error");
      }
    };

    if (user && plan && price) {
      initiatePayment();
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [user, plan, price]); // Removed router from dependencies as we use window.location
  
  // Handle different states
  if (status === "error" && error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-2 text-blue-600 hover:underline"
          onClick={() => router.push('/')}
        >
          Return to homepage
        </button>
      </div>
    );
  }
  
  if (status === "redirecting") {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        
        <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Loading state
  return (
    <div className="flex flex-col items-center justify-center h-64">
        
        {/* Spinner or loading animation */}

      <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default PaymentPage;