"use client";
import {
  Linkedin,
  Instagram
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Custom Reddit Icon Component
const RedditIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center">

        {/* LEFT — Navigation */}
        <div className="space-y-4 text-left">
          <h3 className="text-xl font-bold text-white">Neuva</h3>

          <nav className="flex flex-col space-y-2 text-white/80 text-base">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/our-work" className="hover:text-white transition">Our Work</Link>
            <Link href="/services" className="hover:text-white transition">Services</Link>
          </nav>
        </div>

        {/* CENTER — Logo Image */}
        <div className="my-10 md:my-0">
          <Image
            src="/2.png"
            alt="Neuva Logo"
            width={500}
            height={500}
            className="opacity-80"
          />
        </div>

        {/* RIGHT — Social Media */}
        <div className="mt-10 md:mt-0 flex flex-col text-left md:text-right">
          <p className="text-white/70 mb-3">Follow Us</p>

          <div className="flex gap-5 md:justify-end">
            <Link href="https://www.reddit.com" target="_blank">
              <RedditIcon
                className="w-6 h-6 text-[#8d2020] hover:text-[#b52a2a] transition"
              />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank">
              <Linkedin
                className="w-6 h-6 text-[#8d2020] hover:text-[#b52a2a] transition"
              />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <Instagram
                className="w-6 h-6 text-[#8d2020] hover:text-[#b52a2a] transition"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom small text */}
      <div className="text-center py-6 text-white/40 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Neuva. All rights reserved.
      </div>
    </footer>
  );
}