"use client"
import { useRouter } from "next/navigation";
import Home from "./home/page";
import { useAuth } from "@/contexts/AuthContext";
import ApiServeces from "@/lib/ApiServeces";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Create a separate client component for handling search params
function SubscriptionHandler() {
  const { user, setUser } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");

  useEffect(() => {
    const handleSubscriptionStorage = async (sessionId) => {
      try {
        const plan = localStorage.getItem("pendingSubscription")
        const currentPlan = JSON.parse(plan)
        const planId = currentPlan?.planId;
        const userId = user?._id;
        const res = await ApiServeces.craeteSubscription(sessionId, userId, planId);
        
        if (!res.data.success) {
          throw new Error("Failed to verify payment session");
        }
        
        const response = await ApiServeces.getCurrentUser(userId);
        if (response.data.success) {
          const userData = response.data.user;
          localStorage.removeItem("user")
          setUser(userData)
          localStorage.removeItem("pendingSubscription");
          localStorage.setItem("user", JSON.stringify(userData))
          router.replace("/");
        }
      } catch (err) {
        console.error("Error in handleSubscriptionStorage:", err);
      }
    };

    if (sessionId && user) {
      handleSubscriptionStorage(sessionId);
    }
  }, [sessionId, user, setUser, router]);

  return null; // This component doesn't render anything
}

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <SubscriptionHandler />
      </Suspense>
      <Home />
    </>
  );
}


