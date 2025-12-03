"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import ColorBends from "./ColorBends";
import "../globals.css";
//newer ver 's 's
export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const subtitleText = "Beyond Code. Beyond Ordinary.";

// main tagline that will have the bubble reveal per-letter
  const mainTagline =
    "Professional Website Development, App Solutions & AI Workflow Automation.";

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

  // Trigger load animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect for subtitle - repeats every 1 minute
  useEffect(() => {
    if (!isLoaded) return;
    
    const runTypewriter = () => {
      let currentIndex = 0;
      setDisplayedText("");
      
      const typewriterTimer = setInterval(() => {
        if (currentIndex <= subtitleText.length) {
          setDisplayedText(subtitleText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typewriterTimer);
        }
      }, 80);
      
      return typewriterTimer;
    };
    
    // Run immediately on load
    let typewriterTimer = runTypewriter();
    
    // Repeat every 1 minute (60000ms)
    const repeatInterval = setInterval(() => {
      clearInterval(typewriterTimer);
      typewriterTimer = runTypewriter();
    }, 60000);
    
    return () => {
      clearInterval(typewriterTimer);
      clearInterval(repeatInterval);
    };
  }, [isLoaded]);

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
      className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ColorBends background — placed behind text */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ width: '100%', height: '100%' }}>
        <ColorBends
          colors={["#ea0909ff"]}
          rotation={30}
          speed={0.25}
          scale={1.0}
          frequency={1.2}
          warpStrength={1.05}
          mouseInfluence={0.4}
          parallax={0.4}
          noise={0.08}
          transparent
        />
      </div>

      {/* Left-aligned content block starting from the left edge */}
      <div className="relative z-10 w-full text-left px-4 md:pl-12 lg:pl-16 md:pr-6">
        {/* Brand name and tagline */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2" style={{ fontFamily: "'Sarpanch', sans-serif" }}>
            <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
              NEUVA
            </span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl font-medium tracking-wider text-[#ff6b6b] italic drop-shadow-[0_0_10px_rgba(255,107,107,0.5)]">
            <span className="typewriter-text">{displayedText}</span>
            <span className="typewriter-cursor">|</span>
          </p>
        </div>

        {/* content block with spacing */}
        <div className="mt-6 md:mt-8 max-w-[800px] space-y-4 md:space-y-6">
          {/* MAIN TAGLINE: this line has per-letter reveal bubble */}
          <h2 className={`relative inline-block text-[clamp(22px,5vw,52px)] md:text-[clamp(38px,6.8vw,60px)] font-bold leading-tight text-white slide-up-animation ${isLoaded ? 'slide-up-visible' : ''}`}>
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

        </div>
      </div>

      {/* Fixed CTA button on right side - stays visible while scrolling */}
      <a 
        href="https://calendly.com/neuvatechno/30min" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed right-4 md:right-6 bottom-6 md:bottom-8 z-[100] group"
      >
        <button className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 text-sm md:text-lg text-black font-bold bg-white rounded-full hover:bg-white/95 transition shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 pr-6 md:pr-8">
          <span>Book a Strategy Call</span>
          <span className="arrow-container relative w-4 md:w-5 h-4 md:h-5 flex items-center justify-center">
            <svg 
              className="w-4 md:w-5 h-4 md:h-5 arrow-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </span>
        </button>
      </a>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 opacity-60">
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        <div className="scroll-indicator w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="scroll-dot w-1.5 h-1.5 bg-white rounded-full mt-2 animate-scrollBounce"></div>
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

        /* Cute arrow animation */
        .arrow-icon {
          animation: arrowBounce 1.5s ease-in-out infinite;
        }

        .group:hover .arrow-icon {
          animation: arrowSlide 0.6s ease-in-out infinite;
        }

        @keyframes arrowBounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }

        @keyframes arrowSlide {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(8px);
            opacity: 0.7;
          }
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
        }

        .animate-scrollBounce {
          animation: scrollBounce 1.5s ease-in-out infinite;
        }

        /* Slide up animation for main tagline */
        .slide-up-animation {
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slide-up-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Typewriter cursor animation */
        .typewriter-cursor {
          display: inline-block;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .typewriter-text {
          display: inline;
        }
      `}</style>
    </section>
  );
}