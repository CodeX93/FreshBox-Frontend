import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ApiServeces from "../../lib/ApiServeces";

const PaymentPage = ({ plan, price }) => {
    console.log("Hello I am rendering")
    console.log({ plan, price })
    const router = useRouter();
    const { user } = useAuth();

    const BASE_URL =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const successUrl = `${BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${BASE_URL}/`;

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                if (!user?._id) throw new Error("User not authenticated");
                if (!plan?._id) throw new Error("Invalid plan details");

                const data = {
                    planId: plan._id,
                    userPrice: price,
                    successUrl,
                    cancelUrl,
                    userId: user._id,
                    userEmail: user.email,
                };

                const res = await ApiServeces.upgradePlan(data);
                const resData = res.data;

                if (resData.success && resData.checkoutUrl) {
                    localStorage.setItem(
                        "pendingSubscription",
                        JSON.stringify({
                            planId: plan._id,
                            planDetails: plan,
                            timestamp: new Date().toISOString(),
                        })
                    );
                    // Use resData.checkoutUrl here
                    router.push(resData.checkoutUrl);
                } else {
                    throw new Error("Invalid checkout response");
                }
            } catch (err) {
                console.error("Payment initiation error:", err.message);
            }
        };

        if (user && plan && price) {
            initiatePayment();
        }
    }, [user, plan, price]); // include price as well

    return null;
};

export default PaymentPage;
