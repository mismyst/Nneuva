"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
//newer ver
export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  stats?: { value: string; label: string }[];
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '141, 32, 32';
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  {
    color: '#0a0a0a',
    title: 'Sarah Mitchell',
    description: 'Our previous website felt like it was stuck in 2015. These guys brought it to life with a modern look that our audience can\'t stop talking about.',
    label: 'Co-Founder @ CraftLab'
  },
  {
    color: '#0d0d0d',
    title: 'David Chen',
    description: 'I didn\'t expect this level of polish. Every detail—from the animations to the UX—feels intentional and on point.',
    label: 'Founder @ EduVerse'
  },
  {
    color: '#080808',
    title: 'Emily Rodriguez',
    description: 'Working with Neuva was seamless. They understood our vision and delivered beyond expectations. Truly a partnership, not just a vendor.',
    label: 'Marketing Director',
    stats: [
      { value: '40+', label: 'Projects' },
      { value: '98%', label: 'Satisfaction' },
      { value: '3x', label: 'ROI' }
    ]
  },
  {
    color: '#0b0b0b',
    title: 'Michael Thompson',
    description: 'The AI automation Neuva implemented saved us 20+ hours per week. ROI was immediate and the system is incredibly reliable.',
    label: 'Operations Manager',
    stats: [
      { value: '20h', label: 'Saved/Week' },
      { value: '85%', label: 'Efficiency' },
      { value: '100%', label: 'Uptime' }
    ]
  },
  {
    color: '#090909',
    title: 'Jessica Park',
    description: 'From strategy to launch, Neuva guided us through every step. Their expertise in both design and development is unmatched.',
    label: 'Product Lead, InnovateCo'
  },
  {
    color: '#0c0c0c',
    title: 'Alex Kumar',
    description: 'Best decision we made was choosing Neuva. Professional, ethical, and they genuinely care about delivering value. Highly recommend!',
    label: 'CTO, DataFlow'
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-2 p-3 max-w-[54rem] select-none relative"
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #8d2020;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(141, 32, 32, 1);
            --purple-glow: rgba(141, 32, 32, 0.2);
            --purple-border: rgba(141, 32, 32, 0.8);
          }
          
          .card-responsive {
            grid-template-columns: 1fr;
            width: 95%;
            margin: 0 auto;
            padding: 0.5rem;
            gap: 1rem;
          }
          
          /* Tablet small (600px - 767px) */
          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
              width: 92%;
              gap: 1rem;
            }
          }
          
          /* Tablet large (768px - 1023px) */
          @media (min-width: 768px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
              width: 90%;
              gap: 1.25rem;
            }
          }
          
          /* Desktop small - 13 inch (1024px - 1279px) */
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(3, 1fr);
              width: 92%;
              gap: 1.25rem;
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 1;
              grid-row: span 1;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: span 1;
              grid-row: span 1;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: auto;
              grid-row: auto;
            }
          }
          
          /* Desktop medium - 15/16 inch (1280px - 1535px) */
          @media (min-width: 1280px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
              width: 90%;
              gap: 1.5rem;
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 2;
              grid-row: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: 1 / span 2;
              grid-row: 2 / span 2;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: 4;
              grid-row: 3;
            }
          }
          
          /* Large desktop (1536px+) */
          @media (min-width: 1536px) {
            .card-responsive {
              width: 85%;
              max-width: 1600px;
              gap: 1.5rem;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-3 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-4 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Mobile (up to 599px) */
          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              width: 95%;
              margin: 0 auto;
              padding: 0.5rem;
            }
            
            .card-responsive .card {
              width: 100%;
              min-height: auto !important;
              aspect-ratio: auto !important;
            }
            
            .card-responsive .card .testimonial-text {
              font-size: 0.95rem !important;
              line-height: 1.5 !important;
            }
          }
          
          /* Small tablet (600px - 767px) */
          @media (min-width: 600px) and (max-width: 767px) {
            .card-responsive .card {
              min-height: auto !important;
              aspect-ratio: auto !important;
            }
            
            .card-responsive .card .testimonial-text {
              font-size: 1rem !important;
              line-height: 1.5 !important;
            }
          }
          
          /* Tablet (768px - 1023px) */
          @media (min-width: 768px) and (max-width: 1023px) {
            .card-responsive .card {
              min-height: auto !important;
              aspect-ratio: auto !important;
            }
            
            .card-responsive .card .testimonial-text {
              font-size: 1.05rem !important;
              line-height: 1.55 !important;
            }
          }
          
          /* 13 inch laptop (1024px - 1279px) */
          @media (min-width: 1024px) and (max-width: 1279px) {
            .card-responsive .card {
              min-height: auto !important;
              aspect-ratio: auto !important;
            }
            
            .card-responsive .card .testimonial-text {
              font-size: 1rem !important;
              line-height: 1.5 !important;
            }
          }
          
          /* 15/16 inch laptop (1280px - 1535px) */
          @media (min-width: 1280px) and (max-width: 1535px) {
            .card-responsive .card .testimonial-text {
              font-size: 1.1rem !important;
              line-height: 1.55 !important;
            }
          }
          
          /* Large screens (1536px+) */
          @media (min-width: 1536px) {
            .card-responsive .card .testimonial-text {
              font-size: 1.25rem !important;
              line-height: 1.6 !important;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-responsive grid gap-2">
          {cardData.map((card, index) => {
            const baseClassName = `card flex flex-col justify-between relative w-full max-w-full p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${
              enableBorderGlow ? 'card--border-glow' : ''
            }`;

            const cardStyle = {
              backgroundColor: card.color || 'var(--background-dark)',
              borderColor: 'var(--border-color)',
              color: 'var(--white)',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px'
            } as React.CSSProperties;

            if (enableStars) {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {/* Clean testimonial card layout */}
                  <div className="flex flex-col h-full p-1">
                    {/* Quote icon */}
                    <div className="mb-2 sm:mb-4">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#8d2020] opacity-60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                      </svg>
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="testimonial-text text-white text-base leading-relaxed tracking-wide flex-shrink-0">
                      {card.description}
                    </p>
                    
                    {/* Stats with mini charts for larger cards (index 2 & 3) */}
                    {(index === 2 || index === 3) && card.stats && (
                      <div className="my-3 sm:my-5 pt-3 sm:pt-4 border-t border-white/10 flex-1">
                        {/* Mini bar chart visualization */}
                        <div className="flex items-end gap-1 sm:gap-2 h-12 sm:h-20 mb-3 sm:mb-4">
                          {[65, 85, 45, 90, 70, 95, 80, 55, 88, 75, 92, 60].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-[#8d2020] to-[#b52a2a] rounded-t opacity-80"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                        
                        {/* Stats row */}
                        <div className="flex gap-3 sm:gap-6 justify-between">
                          {card.stats.map((stat, idx) => (
                            <div key={idx} className="text-center flex-1">
                              <div className="text-[#8d2020] text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                              <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Regular stats for other cards */}
                    {index !== 2 && index !== 3 && card.stats && (
                      <div className="flex gap-3 sm:gap-6 my-3 sm:my-5 pt-3 sm:pt-4 border-t border-white/10">
                        {card.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-[#8d2020] text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                            <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Author info */}
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                      <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide">{card.title}</h4>
                      <span className="text-white/50 text-xs sm:text-sm font-light">{card.label}</span>
                    </div>
                  </div>
                </ParticleCard>
              );
            }

            return (
              <div
                key={index}
                className={baseClassName}
                style={cardStyle}
                ref={el => {
                  if (!el) return;

                  const handleMouseMove = (e: MouseEvent) => {
                    if (shouldDisableAnimations) return;

                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    if (enableTilt) {
                      const rotateX = ((y - centerY) / centerY) * -10;
                      const rotateY = ((x - centerX) / centerX) * 10;

                      gsap.to(el, {
                        rotateX,
                        rotateY,
                        duration: 0.1,
                        ease: 'power2.out',
                        transformPerspective: 1000
                      });
                    }

                    if (enableMagnetism) {
                      const magnetX = (x - centerX) * 0.05;
                      const magnetY = (y - centerY) * 0.05;

                      gsap.to(el, {
                        x: magnetX,
                        y: magnetY,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  };

                  const handleMouseLeave = () => {
                    if (shouldDisableAnimations) return;

                    if (enableTilt) {
                      gsap.to(el, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }

                    if (enableMagnetism) {
                      gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  };

                  const handleClick = (e: MouseEvent) => {
                    if (!clickEffect || shouldDisableAnimations) return;

                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const maxDistance = Math.max(
                      Math.hypot(x, y),
                      Math.hypot(x - rect.width, y),
                      Math.hypot(x, y - rect.height),
                      Math.hypot(x - rect.width, y - rect.height)
                    );

                    const ripple = document.createElement('div');
                    ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;

                    el.appendChild(ripple);

                    gsap.fromTo(
                      ripple,
                      {
                        scale: 0,
                        opacity: 1
                      },
                      {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => ripple.remove()
                      }
                    );
                  };

                  el.addEventListener('mousemove', handleMouseMove);
                  el.addEventListener('mouseleave', handleMouseLeave);
                  el.addEventListener('click', handleClick);
                }}
              >
                {/* Clean testimonial card layout */}
                <div className="flex flex-col h-full p-1">
                  {/* Quote icon */}
                  <div className="mb-2 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#8d2020] opacity-60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="testimonial-text text-white text-base leading-relaxed tracking-wide flex-shrink-0">
                    {card.description}
                  </p>
                  
                  {/* Stats with mini charts for larger cards (index 2 & 3) */}
                  {(index === 2 || index === 3) && card.stats && (
                    <div className="my-3 sm:my-5 pt-3 sm:pt-4 border-t border-white/10 flex-1">
                      {/* Mini bar chart visualization */}
                      <div className="flex items-end gap-1 sm:gap-2 h-12 sm:h-20 mb-3 sm:mb-4">
                        {[65, 85, 45, 90, 70, 95, 80, 55, 88, 75, 92, 60].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#8d2020] to-[#b52a2a] rounded-t opacity-80"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* Stats row */}
                      <div className="flex gap-3 sm:gap-6 justify-between">
                        {card.stats.map((stat, idx) => (
                          <div key={idx} className="text-center flex-1">
                            <div className="text-[#8d2020] text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                            <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Regular stats for other cards */}
                  {index !== 2 && index !== 3 && card.stats && (
                    <div className="flex gap-3 sm:gap-6 my-3 sm:my-5 pt-3 sm:pt-4 border-t border-white/10">
                      {card.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-[#8d2020] text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                          <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Author info */}
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide">{card.title}</h4>
                    <span className="text-white/50 text-xs sm:text-sm font-light">{card.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
