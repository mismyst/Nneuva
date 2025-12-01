"use client";
import CircularGallery from "./CircularGallery";
import React from "react";

export default function OurWork() {
  return (
    <section className="w-full py-16 bg-black">
      <div className="pl-6 md:pl-12 lg:pl-16 pr-6">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
          How We Work
        </h1>

        {/* Content Section (LEFT-ALIGNED — unchanged alignment) */}
        <div className="space-y-10 mb-12 max-w-[800px]">
          {/* Collaboration & Clarity */}
          <div>
            <HeadingWithAccent>Collaboration &amp; Clarity</HeadingWithAccent>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mt-3">
              At Neuva, the best digital products begin with shared clarity. We start with open
              conversations, listen carefully, and map your goals so designs and features solve real
              problems — not just look good on a checklist.
            </p>
          </div>

          {/* Intentional Approach */}
          <div>
            <HeadingWithAccent>Intentional Approach</HeadingWithAccent>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mt-3">
              Every decision we make is intentional: design that focuses on usability, development
              that prioritizes long-term maintainability, and AI automation that’s pragmatic and
              ethical. We work transparently — and keep you in the loop at every step.
            </p>
          </div>

          {/* Design Excellence */}
          <div>
            <HeadingWithAccent>Design Excellence</HeadingWithAccent>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mt-3">
              Design for us is system-level craft: clean patterns, considered motion, and a refined
              UI that feels effortless for your users. We obsess over small details that produce
              measurable improvements in conversion and engagement.
            </p>
          </div>
        </div>
      </div>
       <div style={{ height: '600px', position: 'relative' }}>
4  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
5</div>
    </section>
  );
}

/* Small presentational component used for headings so we get a neat left accent
   without touching the overall left alignment of the block. */
function HeadingWithAccent({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-4">
      {/* Accent bar */}
      <span
        aria-hidden
        style={{
          width: 6,
          height: 26,
          borderRadius: 4,
          background: "linear-gradient(180deg, #8d2020, #6a1515)",
          boxShadow: "0 4px 18px rgba(141,32,32,0.18)",
          flex: "0 0 auto",
        }}
      />
      <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{children}</span>
    </h2>
  );
}