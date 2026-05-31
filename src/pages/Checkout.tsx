import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiArrowRight, FiShield, FiLock, FiAlertCircle, FiTruck, FiPackage } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import * as orderApi from "../api/orderApi";
import * as userApi from "../api/userApi";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart } = useCart();
  const [step, setStep] = useState<"details" | "otp" | "placing" | "success">("details");
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "", email: "", phone: "", address: "", city: "", pincode: "",
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; addresses?: Address[] } | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>("");

  const isDirectBuy = location.state?.isDirectBuy;
  const directProduct = location.state?.product;
  const directQuantity = location.state?.quantity || 1;

  const orderItems = useMemo(() => {
    if (isDirectBuy && directProduct) {
      return [{
        productId: directProduct._id || directProduct.id,
        quantity: directQuantity,
        price: parseInt(directProduct.price.toString().replace(/\D/g, "")),
        name: directProduct.name,
        image: directProduct.image,
      }];
    }
    return cart.items;
  }, [isDirectBuy, directProduct, directQuantity, cart.items]);

  const totalAmount = isDirectBuy
    ? parseInt(directProduct.price.toString().replace(/\D/g, "")) * directQuantity
    : cart.totalAmount;

  useEffect(() => {
    const savedDetails = localStorage.getItem("checkoutDetails");
    if (savedDetails) {
      try {
        const parsed = JSON.parse(savedDetails);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch { /* ignore malformed saved data */ }
    }

    const token = localStorage.getItem("token");
    if (token) {
      userApi.getProfile().then((data) => {
        setUserProfile(data.user);
        setFormData(prev => ({ ...prev, name: data.user.name, email: data.user.email }));
        if (data.user.addresses?.length > 0) {
          setAddresses(data.user.addresses);
          setSelectedAddressIndex(0);
          setShowAddressForm(false);
        } else {
          setShowAddressForm(true);
        }
      }).catch(() => setShowAddressForm(true));
    } else {
      setShowAddressForm(true);
    }
  }, []);

  useEffect(() => {
    if (!orderItems || orderItems.length === 0) navigate("/products");
  }, [orderItems, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getShippingAddress = () => {
    if (!showAddressForm && selectedAddressIndex >= 0 && addresses[selectedAddressIndex]) {
      const addr = addresses[selectedAddressIndex];
      return { name: addr.name, phone: addr.phone, address: addr.address, city: addr.city, pincode: addr.pincode };
    }
    return { name: formData.name, phone: formData.phone, address: formData.address, city: formData.city, pincode: formData.pincode };
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("checkoutDetails", JSON.stringify(formData));

    const token = localStorage.getItem("token");

    if (token) {
      if (showAddressForm) {
        try {
          setIsLoading(true);
          const data = await userApi.addAddress({
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,
            isDefault: addresses.length === 0,
          });
          setAddresses(data.user.addresses);
          setSelectedAddressIndex(data.user.addresses.length - 1);
          setShowAddressForm(false);
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Failed to add address";
          toast.error(msg);
          return;
        } finally {
          setIsLoading(false);
        }
      }
      await placeCodOrder();
      return;
    }

    // Guest — needs OTP
    try {
      setIsLoading(true);
      await orderApi.sendOtp({ email: formData.email });
      toast.success("Verification code sent to your email!");
      setStep("otp");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to send verification code";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await orderApi.verifyOtp({ email: formData.email, otp, name: formData.name });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      toast.success("Email verified!");
      await placeCodOrder();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Invalid or expired OTP";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  const placeCodOrder = async () => {
    setStep("placing");
    try {
      const shippingAddress = getShippingAddress();
      const data = await orderApi.createCodOrder({
        items: orderItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
        customerName: formData.name,
        customerEmail: formData.email,
        shippingAddress,
      });

      setPlacedOrderId(data?.orderId || "");

      // Clear cart if not a direct buy
      if (!isDirectBuy) {
        for (const item of cart.items) {
          await removeFromCart(item.productId);
        }
      }

      setStep("success");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to place order. Please try again.";
      toast.error(msg);
      setStep("details");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10">

        {/* Left: Checkout Form */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            {/* COD-only notice banner */}
            {step !== "success" && (
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <FiAlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#b8941f" }} />
                <div>
                  <span className="font-semibold" style={{ color: "#3E2F1C" }}>Online payments are temporarily unavailable.</span>
                  <span className="ml-1" style={{ color: "rgba(62,47,28,0.65)" }}>We currently accept Cash on Delivery (COD) only.</span>
                </div>
              </div>
            )}

            <h1 className="font-serif font-bold text-3xl text-brand-brown mb-8">
              {step === "success" ? "Order Confirmed!" : "Checkout"}
            </h1>

            <AnimatePresence mode="wait">

              {/* ── DETAILS STEP ── */}
              {step === "details" && (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleDetailsSubmit}
                  className="space-y-6"
                >
                  {userProfile && (
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#3E2F1C] text-[#D4AF37] rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                          {userProfile.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-stone-800">{userProfile.name}</p>
                          <p className="text-stone-500 text-sm">{userProfile.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!userProfile && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Full Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>
                  )}

                  {addresses.length > 0 && !showAddressForm && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-stone-800">Delivery Address</h3>
                        <button type="button" onClick={() => setShowAddressForm(true)} className="text-sm text-[#D4AF37] font-bold hover:underline">
                          + Add New
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {addresses.map((addr, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedAddressIndex(idx)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedAddressIndex === idx ? "border-[#D4AF37] bg-amber-50" : "border-stone-200 hover:border-stone-300"}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-bold text-stone-800 text-sm">{addr.name} · {addr.phone}</p>
                                <p className="text-stone-500 text-sm mt-0.5">{addr.address}, {addr.city} – {addr.pincode}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${selectedAddressIndex === idx ? "border-[#D4AF37]" : "border-stone-300"}`}>
                                {selectedAddressIndex === idx && <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showAddressForm && (
                    <div>
                      {addresses.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-stone-800">Add New Address</h3>
                          <button type="button" onClick={() => setShowAddressForm(false)} className="text-sm text-stone-400 hover:text-stone-700">Cancel</button>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {userProfile ? (
                          <>
                            <div>
                              <label className="block text-sm font-bold text-stone-600 mb-2">Name</label>
                              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-stone-600 mb-2">Phone</label>
                              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="+91 9876543210" />
                            </div>
                          </>
                        ) : (
                          <div>
                            <label className="block text-sm font-bold text-stone-600 mb-2">Phone</label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors" placeholder="+91 9876543210" />
                          </div>
                        )}
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
                    </div>
                  )}

                  {/* Payment method — COD only */}
                  <div>
                    <h3 className="font-bold text-stone-800 mb-3">Payment Method</h3>
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#D4AF37] bg-amber-50"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <FiTruck size={20} style={{ color: "#b8941f" }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-stone-800">Cash on Delivery (COD)</p>
                        <p className="text-sm text-stone-500">Pay in cash when your order arrives</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                      <FiAlertCircle size={16} className="flex-shrink-0 text-stone-400" />
                      <p className="text-xs text-stone-400">
                        Online payments (UPI, Card, Net Banking) are temporarily unavailable.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-[#3E2F1C] text-white font-bold flex items-center justify-center gap-2 mt-2 hover:bg-[#2A1F13] transition-colors shadow-lg disabled:opacity-70"
                  >
                    {isLoading
                      ? "Processing..."
                      : localStorage.getItem("token")
                        ? "Place COD Order"
                        : "Continue to Verification"}
                    <FiArrowRight />
                  </button>
                </motion.form>
              )}

              {/* ── OTP STEP ── */}
              {step === "otp" && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleOtpSubmit}
                  className="space-y-6 text-center py-8"
                >
                  <div className="w-16 h-16 bg-amber-50 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                    <FiLock size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#3E2F1C]">Verify Your Email</h2>
                  <p className="text-stone-500">We've sent a 6-digit code to <strong>{formData.email}</strong></p>

                  <div className="max-w-xs mx-auto">
                    <input
                      required
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full text-center text-3xl tracking-widest px-4 py-4 rounded-xl border-2 border-stone-200 focus:border-[#D4AF37] outline-none transition-colors"
                      placeholder="——————"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otp.length < 6}
                    className="w-full max-w-xs mx-auto py-4 rounded-xl bg-[#3E2F1C] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#2A1F13] transition-colors shadow-lg disabled:opacity-70"
                  >
                    {isLoading ? "Verifying..." : "Verify & Place Order"}
                    <FiCheck />
                  </button>

                  <button type="button" onClick={() => setStep("details")} className="text-sm text-stone-400 hover:text-stone-600 block w-full text-center">
                    ← Back to Details
                  </button>
                </motion.form>
              )}

              {/* ── PLACING ORDER ── */}
              {step === "placing" && (
                <motion.div
                  key="placing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-6" />
                  <h2 className="text-xl font-bold text-[#3E2F1C]">Placing Your Order...</h2>
                  <p className="text-stone-500 mt-2">Please do not close this window.</p>
                </motion.div>
              )}

              {/* ── SUCCESS ── */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #e8c84a)" }}
                  >
                    <FiCheck size={36} strokeWidth={2.5} style={{ color: "#3E2F1C" }} />
                  </div>

                  <h2 className="text-2xl font-bold text-[#3E2F1C] mb-2">Order Placed Successfully!</h2>
                  <p className="text-stone-500 mb-1">
                    Thank you for your order. We'll get it to you soon.
                  </p>
                  {placedOrderId && (
                    <p className="text-xs text-stone-400 mb-6">
                      Order ID: <span className="font-mono font-semibold text-stone-500">{placedOrderId}</span>
                    </p>
                  )}

                  {/* COD reminder */}
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl mb-8 text-left w-full max-w-sm"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}
                  >
                    <FiTruck size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#b8941f" }} />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#3E2F1C" }}>Cash on Delivery</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(62,47,28,0.65)" }}>
                        Please keep the exact amount ready when your order arrives.
                      </p>
                    </div>
                  </div>

                  {/* Delivery details */}
                  <div className="w-full max-w-sm space-y-3 mb-8">
                    {[
                      { icon: <FiPackage size={16} />, text: "Order being processed" },
                      { icon: <FiTruck size={16} />, text: "Delivered within 3–7 business days" },
                      { icon: <FiShield size={16} />, text: "Easy returns within 7 days" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-stone-600">
                        <span className="text-[#D4AF37]">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    {localStorage.getItem("token") && (
                      <button
                        onClick={() => navigate("/orders")}
                        className="flex-1 py-3 rounded-xl font-bold text-sm border-2 border-[#3E2F1C] text-[#3E2F1C] hover:bg-stone-50 transition-colors"
                      >
                        View My Orders
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/products")}
                      className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-colors"
                      style={{ background: "linear-gradient(135deg, #D4AF37, #e8c84a)", color: "#3E2F1C" }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Right: Order Summary */}
        {step !== "success" && (
          <div className="lg:w-[380px]">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-32">
              <h2 className="font-bold text-xl text-brand-brown mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-[280px] overflow-y-auto pr-1">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-stone-50 rounded-lg overflow-hidden p-1 flex-shrink-0">
                        {item.image
                          ? <img src={item.image} alt="Product" className="w-full h-full object-contain" />
                          : <div className="w-full h-full bg-amber-100 rounded" />
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-stone-800 truncate">{item.name || `Product #${idx + 1}`}</p>
                        <p className="text-stone-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#3E2F1C] flex-shrink-0">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Payment</span>
                  <span className="font-semibold text-stone-700">Cash on Delivery</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between text-xl font-bold text-brand-brown mb-6">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 bg-stone-50 py-3 rounded-xl border border-stone-100">
                <FiShield className="text-green-600" size={14} />
                <span>Secure Checkout · No Hidden Charges</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
