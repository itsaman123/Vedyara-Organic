import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as wishlistApi from "../api/wishlistApi";
import type { Product } from "../api/productApi";

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlist([]);
      setIsLoading(false);
      return;
    }

    try {
      const items = await wishlistApi.getWishlist();
      setWishlist(items);
    } catch (error: any) {
      console.error("Wishlist fetch error:", error);
      // If unauthorized or invalid token, clear it
      if (error.message?.includes("token") || error.message?.includes("authorized")) {
        localStorage.removeItem("token");
      }
      setWishlist([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const toggleWishlist = async (productId: string) => {
    try {
      await wishlistApi.toggleWishlist(productId);
      await refreshWishlist(); // Refresh to get updated list
    } catch (error) {
      console.error("Toggle wishlist error:", error);
      throw error;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item._id === productId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        toggleWishlist,
        isInWishlist,
        refreshWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
