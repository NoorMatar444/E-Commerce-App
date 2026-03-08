import Link from "next/link.js";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-black w-full h-20 flex items-center justify-center">
        <ul className="flex gap-6 text-white text-xl">
          {["instagram", "facebook", "twitter", "linkedin", "youtube"].map(
            (platform) => (
              <li key={platform}>
                <Link
                  href="#"
                  className="hover:text-green-400 transition duration-300"
                >
                  <i className={`fa-brands fa-${platform}`}></i>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );
}
