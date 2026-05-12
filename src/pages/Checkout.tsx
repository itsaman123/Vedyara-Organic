import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiArrowRight, FiShield, FiLock } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import * as orderApi from "../api/orderApi";
import { loadRazorpayScript } from "../utils/payment";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart } = useCart();
  const [step, setStep] = useState<"details" | "otp" | "processing">("details");
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Parse direct buy parameters from location state
  const isDirectBuy = location.state?.isDirectBuy;
  const directProduct = location.state?.product;
  const directQuantity = location.state?.quantity || 1;

  const orderItems = isDirectBuy
    ? [{ productId: directProduct.id, quantity: directQuantity, price: parseInt(directProduct.price.replace(/\D/g, "")) }]
    : cart.items;

  const totalAmount = isDirectBuy
    ? parseInt(directProduct.price.replace(/\D/g, "")) * directQuantity
    : cart.totalAmount;

  useEffect(() => {
    // Load saved checkout details if any
    const savedDetails = localStorage.getItem("checkoutDetails");
    if (savedDetails) {
      try {
        const parsed = JSON.parse(savedDetails);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (err) {}
    }

    // If authenticated, we could pre-fill data or skip OTP
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app we would fetch the user profile here
      // For now we'll just require them to enter details but maybe skip OTP
      // We will assume they still need to fill the address form
    }
    
    if (!orderItems || orderItems.length === 0) {
      navigate("/products");
    }
  }, [orderItems, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save details to local storage so they don't have to fill it again
    localStorage.setItem("checkoutDetails", JSON.stringify(formData));
    
    const token = localStorage.getItem("token");
    
    // If user is already authenticated, they don't need OTP verification
    if (token) {
      initiatePayment();
      return;
    }

    // Guest User needs OTP verification
    try {
      setIsLoading(true);
      await orderApi.sendOtp({ email: formData.email });
      toast.success("Verification code sent to your email!");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await orderApi.verifyOtp({ email: formData.email, otp });
      toast.success("Email verified successfully!");
      initiatePayment();
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired OTP");
      setIsLoading(false);
    }
  };

  const initiatePayment = async () => {
    setStep("processing");
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.");
      setStep("details");
      return;
    }

    try {
      // Create Razorpay Order on Backend
      const orderData = await orderApi.createRazorpayOrder({
        items: orderItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
        customerName: formData.name,
        customerEmail: formData.email,
        // we could pass address info here as well if the backend supported it
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_Snchsfzv2wSjYI",
        amount: orderData.razorpayOrder.amount,
        currency: orderData.razorpayOrder.currency,
        name: "Vedyara",
        description: `Order of ${orderItems.length} items`,
        order_id: orderData.razorpayOrder.id,
        handler: async (response: any) => {
          try {
            await orderApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderData.orderId,
            });
            toast.success("Payment successful!");
            
            // Clear cart if it wasn't a direct buy
            if (!isDirectBuy) {
              for (const item of cart.items) {
                await removeFromCart(item.productId);
              }
            }
            if (localStorage.getItem("token")) {
              navigate("/orders");
            } else {
              navigate("/");
            }
          } catch (err: any) {
            toast.error("Payment verification failed: " + err.message);
            setStep("details");
          }
        },
        modal: {
          ondismiss: function() {
            setStep("details");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#D4AF37",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error("Could not initiate checkout: " + error.message);
      setStep("details");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Checkout Form */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h1 className="font-serif font-bold text-3xl text-brand-brown mb-8">Secure Checkout</h1>
            
            <AnimatePresence mode="wait">
              {step === "details" && (
                <motion.form 
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleDetailsSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-stone-600 mb-2">Full Name</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-600 mb-2">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-600 mb-2">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="+91 9876543210" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-600 mb-2">Pincode</label>
                      <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="400001" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-stone-600 mb-2">Delivery Address</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="123 Main St, Apt 4B" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-stone-600 mb-2">City / State</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="Mumbai, Maharashtra" />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl bg-[#3E2F1C] text-white font-bold flex items-center justify-center gap-2 mt-8 hover:bg-[#2A1F13] transition-colors shadow-lg disabled:opacity-70">
                    {isLoading ? "Processing..." : localStorage.getItem("token") ? "Proceed to Payment" : "Continue to Verification"} <FiArrowRight />
                  </button>
                </motion.form>
              )}

              {step === "otp" && (
                <motion.form 
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleOtpSubmit} 
                  className="space-y-6 text-center py-8"
                >
                  <div className="w-16 h-16 bg-amber-50 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiLock size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#3E2F1C]">Verify Your Email</h2>
                  <p className="text-stone-500 mb-8">We've sent a 6-digit code to <strong>{formData.email}</strong></p>
                  
                  <div className="max-w-xs mx-auto">
                    <input 
                      required 
                      type="text" 
                      maxLength={6}
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                      className="w-full text-center text-3xl tracking-widest px-4 py-4 rounded-xl border-2 border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" 
                      placeholder="------" 
                    />
                  </div>
                  
                  <button type="submit" disabled={isLoading || otp.length < 6} className="w-full max-w-xs mx-auto py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#e8c84a] text-[#3E2F1C] font-bold flex items-center justify-center gap-2 mt-8 hover:opacity-90 transition-opacity shadow-lg shadow-amber-200 disabled:opacity-70">
                    {isLoading ? "Verifying..." : "Verify & Pay"} <FiCheck />
                  </button>
                  
                  <button type="button" onClick={() => setStep("details")} className="text-sm font-bold text-stone-400 hover:text-stone-600 mt-6 block w-full text-center">
                    Back to Details
                  </button>
                </motion.form>
              )}

              {step === "processing" && (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-6" />
                  <h2 className="text-xl font-bold text-[#3E2F1C]">Initializing Payment...</h2>
                  <p className="text-stone-500 mt-2">Please do not close this window.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Right Side: Order Summary */}
        <div className="lg:w-[400px]">
          <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-32">
            <h2 className="font-bold text-xl text-brand-brown mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-stone-50 rounded-lg overflow-hidden p-1 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt="Product" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-amber-100 rounded" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-stone-800 line-clamp-1">{item.name || `Product ID: ${item.productId}`}</p>
                      <p className="text-stone-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#3E2F1C]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 my-4" />
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
            </div>
            
            <div className="h-px bg-gray-100 my-4" />
            
            <div className="flex justify-between text-xl font-bold text-brand-brown mb-8">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-stone-400 bg-stone-50 py-3 rounded-xl border border-stone-100">
              <FiShield className="text-green-600" />
              <span>Secure Encrypted Connection</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
