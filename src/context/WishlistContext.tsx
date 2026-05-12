import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as wishlistApi from "../api/wishlistApi";
import type { Product } from "../api/productApi";

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalWishlist = (): Product[] => {
    const saved = localStorage.getItem("guest_wishlist");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const saveLocalWishlist = (newWishlist: Product[]) => {
    localStorage.setItem("guest_wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  };

  const refreshWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlist(getLocalWishlist());
      setIsLoading(false);
      return;
    }

    try {
      const items = await wishlistApi.getWishlist();
      setWishlist(items);
    } catch (error: any) {
      console.error("Wishlist fetch error:", error);
      if (error.message?.includes("token") || error.message?.includes("authorized")) {
        localStorage.removeItem("token");
        setWishlist(getLocalWishlist());
      } else {
        setWishlist([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const toggleWishlist = async (product: Product) => {
    const productId = product._id || (product as any).id;
    const token = localStorage.getItem("token");
    if (!token) {
      const localWishlist = getLocalWishlist();
      const exists = localWishlist.some(item => (item._id === productId || (item as any).id === productId));
      
      if (exists) {
        const updated = localWishlist.filter(item => (item._id !== productId && (item as any).id !== productId));
        saveLocalWishlist(updated);
      } else {
        localWishlist.push(product);
        saveLocalWishlist(localWishlist);
      }
      return;
    }

    try {
      await wishlistApi.toggleWishlist(productId);
      await refreshWishlist();
    } catch (error) {
      console.error("Toggle wishlist error:", error);
      throw error;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item._id === productId || (item as any).id === productId);
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
