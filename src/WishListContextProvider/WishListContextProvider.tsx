"use client"

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";

export type WishListContextType = {
  wishcountNumber: number;
  setWishcountNumber: Dispatch<SetStateAction<number>>;
};

// Provide `undefined` as the default so consumers can detect missing provider.
export const WishListContext = createContext<WishListContextType | undefined>(undefined);

export default function WishListContextProvider({ children }: { children: ReactNode }) {
  const [wishcountNumber, setWishcountNumber] = useState<number>(0);

  return (
    <WishListContext.Provider value={{ wishcountNumber, setWishcountNumber }}>
      {children}
    </WishListContext.Provider>
  );
}

// Optional: small helper hook for easier usage in components
export function useWishList() {
  const ctx = useContext(WishListContext);
  if (!ctx) throw new Error('useWishList must be used within WishListContextProvider');
  return ctx;
}

