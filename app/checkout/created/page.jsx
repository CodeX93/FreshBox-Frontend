"use client";
import React, { useState, useCallback, useEffect } from "react";
import OrderConfirmation from "../_components/OrderConfirmation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import ApiServeces from "@/lib/ApiServeces";

function Page() {
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [cartTotal, setCartTotal] = useState(null);
    const [contactData, setContactData] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const sessionId = params.get("session_id");
    const router = useRouter();
    
    // Track if order creation has been attempted
    const [orderCreationAttempted, setOrderCreationAttempted] = useState(false);

    const handleSubscriptionStorage = useCallback(async (sessionId) => {
        // Prevent duplicate order creation
        if (orderCreationAttempted) return;
        
        setLoading(true);
        try {
            const order = localStorage.getItem("orderData");
            if (!order) {
                throw new Error("No order data found");
            }

            const currentOrder = JSON.parse(order);
            setOrderData(currentOrder.orderData);
            setCartTotal(currentOrder.cartTotal);
            setContactData(currentOrder.contactData);
            setScheduleData(currentOrder.scheduleData);
    
            if (sessionId) {
                setOrderCreationAttempted(true);
                const res = await ApiServeces.createOrder(currentOrder.orderData);
                
                if (res.data.success) {
                    setOrderId(res.data.order._id);
                    // Clear cart and order data only after successful order creation
                    localStorage.removeItem("laundryServiceCart");
                    localStorage.removeItem("orderData");
                }
                router.replace("/checkout/created");
            }
        } catch (err) {
            console.error("Error in handleSubscriptionStorage:", err);
        } finally {
            setLoading(false);
        }
    }, [router, orderCreationAttempted]);
    
    useEffect(() => {
        if (sessionId && !orderCreationAttempted) {
            handleSubscriptionStorage(sessionId);
        }
    }, [sessionId, handleSubscriptionStorage, orderCreationAttempted]);
    
    return (
        <>
            {!loading && orderId && (
                <OrderConfirmation
                    orderId={orderId}
                    cartTotal={cartTotal}
                    contactData={contactData}
                    scheduleData={scheduleData}
                />
            )}
        </>
    );
}

export default Page;