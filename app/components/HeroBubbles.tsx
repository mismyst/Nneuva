"use client";

import React from "react";

type Props = {
  text?: string;
  subtitle?: string;
  colors?: string[]; // CSS colors for bubbles
  height?: string; // e.g. "h-screen" or "h-[70vh]"
};

export default function HeroBubbles({
  text = "we're not just helping — we're branding",
  subtitle = "",
  colors = ["#ff5c7a", "#8a5cff", "#00ffd1"],
  height = "h-[70vh]"
}: Props) {
  // pass colors into CSS via style prop
  const cssVars = {
    "--c1": colors[0],
    "--c2": colors[1],
    "--c3": colors[2]
  } as React.CSSProperties;

  return (
    <section
      className={`relative overflow-hidden ${height} flex items-center justify-center`}
      style={cssVars}
      aria-labelledby="hero-heading"
    >
      {/* subtle dark overlay so bubbles pop on any page background */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* bubbles - positioned and animated */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bubbles-wrapper" aria-hidden>
          <div className="bubble b1" />
          <div className="bubble b2" />
          <div className="bubble b3" />
          <div className="bubble b4" />
          <div className="bubble b5" />
        </div>
      </div>

      {/* headline */}
      <div className="relative z-10 px-6 text-center">
        <h1
          id="hero-heading"
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.6)" }}
        >
          {text}
        </h1>

        {subtitle ? (
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* component-scoped CSS */}
      <style jsx>{`
        .bubbles-wrapper {
          position: relative;
          width: 1200px;
          height: 400px;
          display: block;
        }

        .bubble {
          position: absolute;
          border-radius: 999px;
          filter: blur(40px);
          opacity: 0.75;
          mix-blend-mode: screen;
          transform: translate3d(0, 0, 0);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }

        /* individual bubbles: size, color, start position, animation */
        .b1 {
          width: 420px;
          height: 420px;
          left: 6%;
          top: 40%;
          background: radial-gradient(circle at 30% 30%, var(--c1), transparent 40%);
          animation: float1 10s infinite linear;
          opacity: 0.9;
        }
        .b2 {
          width: 360px;
          height: 360px;
          left: 28%;
          top: 20%;
          background: radial-gradient(circle at 40% 35%, var(--c2), transparent 45%);
          animation: float2 12s infinite linear;
          opacity: 0.7;
        }
        .b3 {
          width: 480px;
          height: 480px;
          left: 52%;
          top: 25%;
          background: radial-gradient(circle at 50% 50%, var(--c3), transparent 45%);
          animation: float3 14s infinite linear;
          opacity: 0.65;
        }
        .b4 {
          width: 260px;
          height: 260px;
          left: 72%;
          top: 50%;
          background: radial-gradient(circle at 40% 30%, var(--c1), transparent 45%);
          animation: float4 11s infinite linear;
          opacity: 0.55;
        }
        .b5 {
          width: 320px;
          height: 320px;
          left: 40%;
          top: 60%;
          background: radial-gradient(circle at 30% 40%, var(--c2), transparent 45%);
          animation: float5 13s infinite linear;
          opacity: 0.48;
        }

        /* subtle inner glow on headline using pseudo element approach is tricky with JSX,
           so we enhance with a small halo element behind text */
        .bubbles-wrapper::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 520px;
          height: 180px;
          border-radius: 100px;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 40%);
          filter: blur(40px);
          pointer-events: none;
        }

        /* floating keyframes */
        @keyframes float1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -18px, 0) scale(1.02); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-14px, -8px, 0) scale(1.01); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes float3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, -20px, 0) scale(1.03); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes float4 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-10px, 12px, 0) scale(0.99); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes float5 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, 6px, 0) scale(1.01); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        /* responsive sizing */
        @media (max-width: 1024px) {
          .bubbles-wrapper { width: 900px; height: 360px; }
          .b1 { width: 360px; height: 360px; }
          .b3 { width: 420px; height: 420px; }
        }
        @media (max-width: 640px) {
          .bubbles-wrapper { width: 520px; height: 260px; }
          .b1, .b2, .b3, .b4, .b5 { filter: blur(28px); }
        }
      `}</style>
    </section>
  );
}