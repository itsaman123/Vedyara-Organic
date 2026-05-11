import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as cartApi from "../api/cartApi";

interface CartContextType {
  cart: cartApi.Cart | null;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<cartApi.Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await cartApi.getCart();
      setCart(data);
    } catch (error: any) {
      console.error("Cart fetch error:", error);
      // If unauthorized or invalid token, clear it
      if (error.message?.includes("token") || error.message?.includes("authorized")) {
        localStorage.removeItem("token");
      }
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const updatedCart = await cartApi.addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await cartApi.updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Update cart error:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
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
