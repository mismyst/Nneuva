"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
   <nav className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 flex items-center justify-between">
  <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Neuva Logo"
          width={40}       // adjust as needed
          height={40}
          priority         // loads instantly on first paint
        />
      </Link>

  <ul className="flex gap-6 text-white">
    <li className="hover:text-red-300 transition">
      <Link href="/">Home</Link>
    </li>
    <li className="hover:text-red-300 transition">
      <button>Book Now </button>
      
    </li>
  </ul>
</nav>
  );
}