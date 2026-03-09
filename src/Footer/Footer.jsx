import Link from "next/link.js";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-black text-white text-center p-4 flex justify-center">
      <ul className="flex gap-4">
        {["instagram", "facebook", "twitter", "linkedin", "youtube"].map(
          (platform) => (
            <li key={platform}>
              <Link href="">
                <i className={`fa-brands fa-${platform}`}></i>
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
