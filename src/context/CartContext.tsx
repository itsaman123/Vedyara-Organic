import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as cartApi from "../api/cartApi";

interface CartContextType {
  cart: cartApi.Cart | null;
  isLoading: boolean;
  addToCart: (product: any, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<cartApi.Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalCart = (): cartApi.Cart => {
    const saved = localStorage.getItem("guest_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { items: [], totalAmount: 0 };
      }
    }
    return { items: [], totalAmount: 0 };
  };

  const saveLocalCart = (newCart: cartApi.Cart) => {
    localStorage.setItem("guest_cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const refreshCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart(getLocalCart());
      setIsLoading(false);
      return;
    }

    try {
      const data = await cartApi.getCart();
      setCart(data);
    } catch (error: any) {
      console.error("Cart fetch error:", error);
      if (error.message?.includes("token") || error.message?.includes("authorized")) {
        localStorage.removeItem("token");
        setCart(getLocalCart());
      } else {
        setCart(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (product: any, quantity: number = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const localCart = getLocalCart();
      const productId = product._id || product.id;
      const existingItemIndex = localCart.items.findIndex(item => item.productId === productId);
      
      if (existingItemIndex > -1) {
        localCart.items[existingItemIndex].quantity += quantity;
      } else {
        localCart.items.push({
          productId,
          name: product.name || "Product",
          price: product.price ? Number(String(product.price).replace(/[^0-9.]/g, '')) : 0,
          image: product.image || (product.images && product.images[0]) || "",
          quantity,
          slug: product.slug || productId
        });
      }
      
      // Calculate total
      localCart.totalAmount = localCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      saveLocalCart(localCart);
      return;
    }

    try {
      const productId = product._id || product.id;
      const updatedCart = await cartApi.addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const localCart = getLocalCart();
      const item = localCart.items.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        localCart.totalAmount = localCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        saveLocalCart(localCart);
      }
      return;
    }

    try {
      const updatedCart = await cartApi.updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Update cart error:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const localCart = getLocalCart();
      localCart.items = localCart.items.filter(item => item.productId !== productId);
      localCart.totalAmount = localCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      saveLocalCart(localCart);
      return;
    }

    try {
      const updatedCart = await cartApi.removeFromCart(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Remove from cart error:", error);
      throw error;
    }
  };

  const cartCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
