"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import ColorBends from "./ColorBends";

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // main tagline that will have the bubble reveal per-letter
  const mainTagline =
    "Professional Website Development, App Solutions & AI Workflow Automation.";

  // supporting paragraph lines (left aligned)
  const supporting = [
    "Neuva delivers clean, functional, and scalable digital products tailored to your business.",
    "Our solutions focus on performance, usability, and long-term maintainability.",
    "AI automation helps eliminate repetitive manual work and boost operational efficiency.",
    "We build with responsibility, transparency, and respect for your customers’ experience.",
    "Choose Neuva if you want technology that is dependable, ethical, and built to scale.",
  ];

  // per-letter reveal state
  const bubbleRadius = 140;
  const [active, setActive] = useState<{ i: number | null; rx: number; ry: number; r: number }>({
    i: null,
    rx: 0,
    ry: 0,
    r: bubbleRadius,
  });

  useEffect(() => {
    const onUp = () => setIsPointerDown(false);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  // hide bubble outline when section is out of view
  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  // global pointer tracking (used for the outline bubble position)
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.addEventListener("pointermove", handlePointerMove as any);
    const down = () => setIsPointerDown(true);
    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointermove", handlePointerMove as any);
      el.removeEventListener("pointerdown", down);
    };
  }, [handlePointerMove]);

  // per-letter helpers
  const letters = Array.from(mainTagline);

  const onEnterLetter = (idx: number, e: React.PointerEvent<HTMLSpanElement>) => {
    const span = e.currentTarget as HTMLSpanElement;
    const rect = span.getBoundingClientRect();
    const rootRect = rootRef.current!.getBoundingClientRect();
    const rx = rect.left + rect.width / 2 - rootRect.left;
    const ry = rect.top + rect.height / 2 - rootRect.top;
    setActive({ i: idx, rx, ry, r: bubbleRadius });
  };

  const onMoveLetter = (idx: number, e: React.PointerEvent<HTMLSpanElement>) => {
    if (active.i !== idx) onEnterLetter(idx, e);
    const rootRect = rootRef.current!.getBoundingClientRect();
    setActive((prev) => ({
      ...prev,
      rx: e.clientX - rootRect.left,
      ry: e.clientY - rootRect.top,
    }));
  };

  const onLeaveLetter = (idx: number) => {
    setActive((prev) => ({ ...prev, i: prev.i === idx ? null : prev.i }));
  };

  const letterStyle = (idx: number) => {
    const cx = active.i === idx ? `${active.rx}px` : `-9999px`;
    const cy = active.i === idx ? `${active.ry}px` : `-9999px`;
    const r = active.i === idx ? `${active.r}px` : `0px`;
    return {
      ["--mx" as any]: cx,
      ["--my" as any]: cy,
      ["--mr" as any]: r,
    } as React.CSSProperties;
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-[560px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ColorBends background — placed behind text */}
      <div className="absolute inset-0 pointer-events-none">
        <ColorBends
          colors={["#8d2020"]}
          rotation={30}
          speed={0.25}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.05}
          mouseInfluence={0.6}
          parallax={0.6}
          noise={0.08}
          transparent
        />
      </div>

      {/* Cursor outline bubble that follows pointer while section is in view */}
      {isInView && (
        <>
          <div
            aria-hidden
            className="pointer-events-none fixed z-[60] mix-blend-screen transition-opacity duration-200"
            style={{
              left: `calc(${cursor.x}px)`,
              top: `calc(${cursor.y}px)`,
              width: isPointerDown ? 220 : 140,
              height: isPointerDown ? 220 : 140,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "2px solid rgba(141,32,32,0.3)",
              boxShadow: "0 0 40px rgba(141,32,32,0.2), inset 0 0 30px rgba(141,32,32,0.1)",
              zIndex: 60,
              pointerEvents: "none",
              backdropFilter: "blur(8px)",
              animation: "float 3s ease-in-out infinite",
            }}
          />
          {/* SVG filter for water distortion effect */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="water-distortion">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.02;0.025;0.02"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="8"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>
        </>
      )}

      {/* Left-aligned content block (centred vertically within the section) */}
      <div className="relative z-50 px-6 max-w-[1000px] w-full text-left">
        {/* Brand name and tagline */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2">
            <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
              NEUVA
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wider text-[#8d2020] italic">
            Beyond Code. Beyond Ordinary.
          </p>
        </div>

        {/* content block with spacing */}
        <div className="mt-8 max-w-[800px] space-y-6">
          {/* MAIN TAGLINE: this line has per-letter reveal bubble */}
          <h2 className="relative inline-block text-[clamp(28px,5vw,52px)] md:text-[clamp(38px,6.8vw,60px)] font-bold leading-tight text-white">
            {/* base white layer (visible text) */}
            <span className="block select-none">{mainTagline}</span>

            {/* overlay with per-letter masked spans (reveals ColorBends through mask) */}
            <span className="absolute inset-0 top-0 left-0 pointer-events-none" aria-hidden>
              {letters.map((ch, i) => {
                const char = ch === " " ? "\u00A0" : ch;
                return (
                  <span
                    key={i}
                    onPointerEnter={(e) => onEnterLetter(i, e)}
                    onPointerMove={(e) => onMoveLetter(i, e)}
                    onPointerLeave={() => onLeaveLetter(i)}
                    style={letterStyle(i)}
                    className="inline-block reveal-mask select-none"
                  >
                    <span className="reveal-inner" aria-hidden>
                      {char}
                    </span>
                  </span>
                );
              })}
            </span>
          </h2>

          {/* supporting paragraphs (left aligned, neat font styles) */}
          <div className="text-white/80 space-y-3 text-[17px] md:text-[18px] lg:text-[19px] leading-relaxed font-light">
            {supporting.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          {/* CTA row: "Book a Strategy Call" with white button */}
          <div className="mt-8 flex items-center gap-4">
            <a 
              href="https://cal.com/neuva-forge" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="px-8 py-4 text-base md:text-lg text-black font-bold bg-white rounded-lg hover:bg-white/95 transition shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Book a Strategy Call
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Component-scoped CSS for letter reveal mask */}
      <style jsx>{`
        /* ensure the per-letter overlay aligns with base text */
        h2 > span.reveal-mask {
          position: relative;
          font: inherit;
          letter-spacing: inherit;
          display: inline-block;
          vertical-align: top;
          margin: 0;
          padding: 0 0.02em;
          pointer-events: auto;
        }

        .reveal-mask .reveal-inner {
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(90deg, #8d2020, #b52a2a 48%, #ff6b6b);
          -webkit-text-fill-color: white;
          transition: transform 220ms cubic-bezier(.2,.9,.2,1);
          transform-origin: center;
        }

        .reveal-mask {
          --mx: -9999px;
          --my: -9999px;
          --mr: 0px;
          -webkit-mask-image: radial-gradient(
            ellipse 120% 100% at var(--mx) var(--my), 
            rgba(0,0,0,1) 0px, 
            rgba(0,0,0,0.9) calc(var(--mr) * 0.3), 
            rgba(0,0,0,0.6) calc(var(--mr) * 0.6),
            rgba(0,0,0,0.2) calc(var(--mr) * 0.85),
            rgba(0,0,0,0) calc(var(--mr) * 1.2)
          );
          mask-image: radial-gradient(
            ellipse 120% 100% at var(--mx) var(--my), 
            rgba(0,0,0,1) 0px, 
            rgba(0,0,0,0.9) calc(var(--mr) * 0.3), 
            rgba(0,0,0,0.6) calc(var(--mr) * 0.6),
            rgba(0,0,0,0.2) calc(var(--mr) * 0.85),
            rgba(0,0,0,0) calc(var(--mr) * 1.2)
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          transition: 
            -webkit-mask-position 180ms cubic-bezier(0.23, 1, 0.32, 1), 
            mask-position 180ms cubic-bezier(0.23, 1, 0.32, 1), 
            -webkit-mask-size 200ms cubic-bezier(0.23, 1, 0.32, 1), 
            mask-size 200ms cubic-bezier(0.23, 1, 0.32, 1);
          filter: url(#water-distortion);
        }

        .reveal-mask:hover .reveal-inner {
          transform: scale(1.05);
          transition-duration: 280ms;
          animation: ripple 0.6s ease-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 640px) {
          h2 {
            font-size: clamp(24px, 8.5vw, 40px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          33% {
            transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
          }
          66% {
            transform: translate(-50%, -50%) scale(0.98) rotate(-2deg);
          }
        }
      `}</style>
    </section>
  );
}