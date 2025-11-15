"use client"

import { createContext, useState } from "react";




export const WishListContext=createContext();

export default function WishListContextProvider({children}){
    const [wishcountNumber, setWishcountNumber] = useState(0);

     return (
        <WishListContext.Provider value={{ wishcountNumber, setWishcountNumber }}>
          {children}
        </WishListContext.Provider>
      );
}