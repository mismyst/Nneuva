"use client";

import React from "react";
import CalEmbed from "./CalEmbed";

export default function BookCall() {
  return (
    <section id="book" className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-28 bg-black overflow-hidden">
      <div className="max-w-[1600px]">
        {/* Heading - matching other sections */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h2
            aria-label="Book a Call"
            className="font-extrabold uppercase leading-[0.9] text-white"
            style={{
              fontSize: "6.5rem",
              fontFamily: "'Sarpanch', sans-serif",
            }}
          >
            <div className="block md:hidden text-[4.25rem] leading-[0.9]">BOOK A</div>
            <div className="hidden md:block">BOOK A</div>
            <div className="block md:hidden text-[4.25rem] leading-[0.9] mt-[-0.06em]">CALL</div>
            <div className="hidden md:block mt-[-0.06em]">CALL</div>
          </h2>

          {/* subtle dividing line */}
          <div className="mt-4 mb-10 sm:mb-12 md:mb-16">
            <div className="h-[1px] w-full bg-white/10" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-base md:text-lg max-w-xl mb-8 md:mb-12">
          Ready to transform your digital presence? Schedule a free strategy call with our team.
        </p>
      </div>

      {/* Cal.com embed container - centered and full width */}
      <div className="w-full flex justify-center">
        <div className="w-full">
          <CalEmbed
            calLink="neuva-forge/strategycall"
            height={900}
          />
        </div>
      </div>
    </section>
  );
}
