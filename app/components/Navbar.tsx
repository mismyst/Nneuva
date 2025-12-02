"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
//this is the newer vers than other 
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-6">
      {/* NAV BAR (floating glass pill) */}
      <nav className="w-full max-w-4xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between
                      bg-white/10 backdrop-blur-xl border border-white/20 rounded-full
                      shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2 z-30">
          <Image src="/Logo.png" alt="Neuva Logo" width={32} height={32} priority />
        </Link>

        {/* CENTER: Navigation links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm font-medium text-white/90 hover:text-white transition"
          >
            Home
          </Link>
        </div>

        {/* RIGHT: Book Now button */}
        <div className="flex items-center gap-3 z-30">
          <a
            href="https://cal.com/neuva-forge"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            Book Now
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-white/90
                       hover:bg-white/10 transition"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((s) => !s)}
          >
            {/* simple hamburger icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (slides down) */}
      <div
        className={`md:hidden mt-2 mx-auto max-w-4xl origin-top transform transition-all duration-200 ease-in-out overflow-hidden 
                    bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl ${
          mobileOpen ? "max-h-[420px] py-4" : "max-h-0 border-transparent"
        }`}
      >
        <div className="px-4">
          <ul className="flex flex-col gap-1 text-white/90 text-base">
            <li>
              <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-white/10 font-medium">Home</Link>
            </li>
            <li className="pt-2">
              <a 
                href="https://cal.com/neuva-forge"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-3 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90"
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}