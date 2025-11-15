"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { WishListContext } from "@/WishListContextProvider/WishListContextProvider";
import { CartContext } from "@/app/CartContextProvider/CartContextProvider";


export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  const { wishcountNumber } = useContext(WishListContext);

  // ✅ Handle possible undefined CartContext safely
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("CartContext not found");
  const { countNumber } = cartContext;

  function Logout() {
    signOut({ callbackUrl: "/Login" });
  }

  return (
    <nav className="bg-green-700 w-full text-white">
      <div className="container w-full lg:w-[80%] p-2 mx-auto flex flex-col gap-5 lg:flex-row justify-between">
        {/* Left Side */}
        <div className="first">
          <ul className="flex lg:gap-4 gap-8 items-center">
            <li className="flex items-center gap-2">
              <Link className={path === "/" ? "active" : ""} href="/">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
              FreshCart
            </li>

            <li>
              <Link className={path === "/" ? "active" : ""} href="/">
                Home
              </Link>
            </li>

            {/* 🛒 Cart */}
            {session && (
              <li className="relative">
                <Link
                  className={`relative ${path === "/Cart" ? "active" : ""}`}
                  href="/Cart"
                >
                  Cart
                  {countNumber > 0 && (
                    <span className="absolute -top-2 -end-3 flex size-5 bg-white rounded-full justify-center items-center text-emerald-600 text-sm font-bold">
                      {countNumber}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* 📦 Other Pages */}
            <li>
              <Link
                className={path === "/Products" ? "active" : ""}
                href="/Products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className={path === "/Categories" ? "active" : ""}
                href="/Categories"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                className={path === "/Brands" ? "active" : ""}
                href="/Brands"
              >
                Brands
              </Link>
            </li>

            {session && (
              <li>
                <Link
                  className={path === "/Address" ? "active" : ""}
                  href="/Address"
                >
                  Address
                </Link>
              </li>
            )}

            {/* 💖 Wishlist */}
            <li className="relative">
              <Link
                className={`relative ${path === "/WishList" ? "active" : ""}`}
                href="/WishList"
              >
                <i className="fa-solid fa-clipboard-list"></i>
                {wishcountNumber > 0 && (
                  <span className="absolute -top-2 -end-3 flex size-5 bg-white rounded-full justify-center items-center text-emerald-600 text-sm font-bold">
                    {wishcountNumber}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="last">
          <ul className="flex lg:gap-4 gap-8 items-center">
            {["instagram", "facebook", "twitter", "linkedin", "youtube"].map(
              (platform) => (
                <li key={platform}>
                  <Link href="">
                    <i className={`fa-brands fa-${platform}`}></i>
                  </Link>
                </li>
              )
            )}

            {!session ? (
              <>
                <li>
                  <Link
                    className={path === "/Register" ? "active" : ""}
                    href="/Register"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className={path === "/Login" ? "active" : ""}
                    href="/Login"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <span className="cursor-pointer" onClick={Logout}>
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

