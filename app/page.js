"use client"
import { useRouter, useSearchParams } from "next/navigation";
import Home from "./home/page";
import { useAuth } from "@/contexts/AuthContext";
import ApiServeces from "@/lib/ApiServeces";
import { useCallback, useEffect } from "react";


export default function Page() {
  const { user,setUser } = useAuth();
  const params = useSearchParams();
  const router = useRouter()

  // Handle subscription storage after successful payment
  const handleSubscriptionStorage = useCallback(
    async (sessionId) => {
      try {
        const plan = localStorage.getItem("pendingSubscription")
        const currentPlan = JSON.parse(plan)
        const planId = currentPlan.planId;
        const userId = user?._id;
        const res = await ApiServeces.craeteSubscription(sessionId, userId,planId);

        if (!res.data.success) {
          throw new Error("Failed to verify payment session");
        }

        const response = await ApiServeces.getCurrentUser(userId);
        if (response.data.success) {
          const user = response.data.user;
          localStorage.setItem("user",user)
          setUser(user)
          localStorage.removeItem("pendingSubscription");
          router.replace("/");
        }
      } catch (err) {
        console.error("Error in handleSubscriptionStorage:", err);
      }
    },
    [user]
  );

  const sessionId = params.get("session_id");

  useEffect(() => {
    if (sessionId&& user) {

      handleSubscriptionStorage(sessionId);
    }
  }, [sessionId,user]);

  return <Home />;
}
