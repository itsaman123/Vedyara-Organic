import type { ApiResponse } from "./productApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface CreateOrderResponse {
  razorpayOrder: RazorpayOrder;
  orderId: string;
}

export const createRazorpayOrder = async (data: {
  items: { productId: string; quantity: number }[];
  customerName: string;
  customerEmail: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/orders/create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const payload = (await response.json()) as ApiResponse<CreateOrderResponse>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Failed to create order");
  }
  return payload.data;
};

export const verifyPayment = async (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/orders/verify`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const payload = (await response.json()) as ApiResponse<any>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Payment verification failed");
  }
  return payload.data;
};
