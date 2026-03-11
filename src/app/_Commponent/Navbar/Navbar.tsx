"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { CartContext } from "@/app/CartContextProvider/CartContextProvider";
import { useWishList } from "@/WishListContextProvider/WishListContextProvider";



export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  const { wishcountNumber } = useWishList();

  // ✅ Handle possible undefined CartContext safely
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("CartContext not found");
  const { countNumber } = cartContext;

  function Logout() {
    signOut({ callbackUrl: "/Login" });
  }

  return (
    <nav className="bg-[#0B172A] w-full text-white">
      <div className="container w-full lg:w-[80%] p-2 mx-auto flex flex-col gap-5 lg:flex-row justify-between">
        {/* Left Side */}
        <div className="first">
          <ul className="flex lg:gap-4 gap-8 items-center">
            <li className="flex items-center gap-2">
              <Link className={`${path === "/" ? "active" : ""} hover:text-[#F9A08B]`} href="/">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
              FreshCart
            </li>

            <li>
              <Link className={`${path === "/" ? "active" : ""} hover:text-[#F9A08B]`} href="/">
                Home
              </Link>
            </li>

            {/* 🛒 Cart */}
            {session && (
              <li className="relative">
                <Link
                  className={`relative ${path === "/Cart" ? "active" : ""} hover:text-[#F9A08B]`}
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
                className={`${path === "/Products" ? "active" : ""} hover:text-[#F9A08B]`}
                href="/Products"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "/Categories" ? "active" : ""} hover:text-[#F9A08B]`}
                href="/Categories"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "/Brands" ? "active" : ""} hover:text-[#F9A08B]`}
                href="/Brands"
              >
                Brands
              </Link>
            </li>

            {session && (
              <li>
                <Link
                  className={`${path === "/Address" ? "active" : ""} hover:text-[#F9A08B]`}
                  href="/Address"
                >
                  Address
                </Link>
              </li>
            )}

            {/* 💖 Wishlist */}
            <li className="relative">
              <Link
                className={`relative ${path === "/WishList" ? "active" : ""} hover:text-[#F9A08B]`}
                href="/WishList"
              >
                WishList
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
           

            {!session ? (
              <>
                <li>
                  <Link
                    className={`${path === "/Register" ? "active" : ""} hover:text-[#F9A08B]`}
                    href="/Register"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "/Login" ? "active" : ""} hover:text-[#F9A08B]`}
                    href="/Login"
                  >
                    Signin
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <span className="cursor-pointer hover:text-[#F9A08B]" onClick={Logout}>
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

