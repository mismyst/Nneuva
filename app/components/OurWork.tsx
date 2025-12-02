"use client";
import CircularGallery from "./CircularGallery";
import React from "react";
//new
export default function OurWork() {
  return (
    <section className="relative w-full bg-black min-h-screen overflow-hidden">
      {/* --- Centered heading above gallery --- */}
      <div className="w-full text-center pt-16 md:pt-20 pb-6">
        <p className="text-white/50 text-sm md:text-base uppercase tracking-[0.3em] mb-3">
          That&apos;s what we do
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Crafting Digital Experiences
        </h2>
      </div>

      {/* --- TOP: Circular gallery --- */}
      <div
        className="pointer-events-none w-full flex justify-center pt-4 md:pt-8"
        style={{ zIndex: 10 }}
      >
        <div style={{ width: 1200, height: 420, maxWidth: "95vw" }}>
          <CircularGallery
            bend={0}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>

      {/* --- LEFT-ALIGNED STACKED HEADING (below gallery) --- */}
      <div className="relative z-20 mt-10 md:mt-14 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1200px]">
          <div className="flex items-start gap-6">
            {/* Heading column */}
            <div className="w-full md:w-1/2 lg:w-1/3">
              <h2
                aria-label="Our Work"
                className="font-extrabold uppercase leading-[0.9] text-white"
                style={{
                  fontSize: "6.5rem", // base large size for desktop; we'll make responsive below
                }}
              >
                <div className="block md:hidden text-[4.25rem] leading-[0.9]">OUR</div>
                <div className="hidden md:block">OUR</div>
                <div className="block md:hidden text-[4.25rem] leading-[0.9] mt-[-0.06em]">WORK</div>
                <div className="hidden md:block mt-[-0.06em]">WORK</div>
              </h2>

              {/* subtle dividing line across the full width */}
              <div className="mt-4">
                <div
                  className="h-[1px] w-full bg-white/10"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>

            {/* empty space to the right to mimic large negative space in reference */}
            <div className="hidden md:block flex-1" />
          </div>
        </div>
      </div>

      {/* --- CONTENT COLUMNS BELOW THE HEADING --- */}
      <div className="relative z-20 mt-8 pb-28 px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90 text-sm md:text-base">
            <div className="space-y-6">
              <HeadingWithAccentSmall>Collaboration &amp; Clarity</HeadingWithAccentSmall>
              <p className="leading-relaxed text-white/80">
                At Neuva, the best digital products begin with shared clarity. We start with open
                conversations, listen carefully, and map your goals so designs and features solve
                real problems — not just look good on a checklist.
              </p>
            </div>

            <div className="space-y-6">
              <HeadingWithAccentSmall>Intentional Approach</HeadingWithAccentSmall>
              <p className="leading-relaxed text-white/80">
                Every decision we make is intentional: design that focuses on usability, development
                that prioritizes long-term maintainability, and AI automation that’s pragmatic and
                ethical. We work transparently — and keep you in the loop at every step.
              </p>
            </div>

            <div className="space-y-6">
              <HeadingWithAccentSmall>Design Excellence</HeadingWithAccentSmall>
              <p className="leading-relaxed text-white/80">
                Design for us is system-level craft: clean patterns, considered motion, and a refined
                UI that feels effortless for your users. We obsess over small details that produce
                measurable improvements in conversion and engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small presentational component used for the three section headings */
function HeadingWithAccentSmall({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-4">
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
      <span className="text-lg md:text-xl font-bold text-white tracking-tight">
        {children}
      </span>
    </h3>
  );
}