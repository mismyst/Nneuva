"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 60,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    
    switch (direction) {
      case "up":
        fromVars.y = y;
        break;
      case "down":
        fromVars.y = -y;
        break;
      case "left":
        fromVars.x = y;
        break;
      case "right":
        fromVars.x = -y;
        break;
    }

    const animation = gsap.fromTo(
      element,
      fromVars,
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [delay, duration, y, direction]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}