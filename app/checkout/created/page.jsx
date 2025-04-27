"use client";
import React, { useState, useCallback, useEffect, Suspense, useRef } from "react";
import OrderConfirmation from "../_components/OrderConfirmation";
import { useRouter, useSearchParams } from "next/navigation";
import ApiServeces from "@/lib/ApiServeces";

function CheckoutContent() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  
  const sessionId = params.get("session_id");
  const router = useRouter();

  const orderCreationAttemptedRef = useRef(false); 

  const handleSubscriptionStorage = useCallback(async (sessionId) => {
    if (orderCreationAttemptedRef.current) return; 
    orderCreationAttemptedRef.current = true; 

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
        const res = await ApiServeces.createOrder(currentOrder.orderData);
        if (res.data.success) {
          setOrderId(res.data.order._id);
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
  }, [router]);

  useEffect(() => {
    if (sessionId) {
      handleSubscriptionStorage(sessionId);
    }
  }, [sessionId, handleSubscriptionStorage]);

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

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

export default Page;
