"use client";

import React, { useEffect, useRef } from "react";
//new 's
type Service = {
  title: string;
  headline: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    title: "Web Design",
    headline: "Turn your website into a 24/7 sales machine",
    description:
      "Stop bleeding money on ads that lead nowhere. We design sites that convert cold traffic into booked calls without you lifting a finger. Our approach focuses on user experience, fast load times, and conversion-optimized layouts that work around the clock."
  },
  {
    title: "App Development",
    headline: "Beautiful apps that actually get used",
    description:
      "From idea to store release — performant mobile apps with thoughtful UX that keep users coming back and reduce churn. We build native and cross-platform applications that feel intuitive, load instantly, and scale with your growing user base."
  },
  {
    title: "SaaS",
    headline: "Build a scalable SaaS that grows with customers",
    description:
      "Design and develop resilient SaaS platforms: billing, multi-tenant architecture, telemetry, and automated CI/CD for rapid iteration. We handle the complex infrastructure so you can focus on delivering value to your customers."
  },
  {
    title: "B2B Development",
    headline: "Custom B2B systems that power operations",
    description:
      "Enterprise integrations, secure APIs, complex workflows and analytics — we build B2B products that actually solve business problems. From internal tools to customer-facing portals, we create systems that streamline operations and drive efficiency."
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="w-full text-white bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Page heading - OUR WORK style */}
      <div className="max-w-[1400px]">
        <h2
          aria-label="Services"
          className="font-extrabold uppercase leading-[0.9] text-white mb-8 sm:mb-10 fade-up"
          style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)" }}
        >
          <div>SERVICES</div>
        </h2>
        
        {/* subtle dividing line */}
        <div className="h-[1px] w-full bg-white/10 mb-10 sm:mb-12 fade-up" />

        {/* Rows */}
        <div className="divide-y divide-gray-800/60">
          {SERVICES.map((s, idx) => (
            <div
              key={s.title}
              className="py-10 sm:py-12 md:py-16 lg:py-20 flex flex-col md:flex-row items-start md:items-start gap-6 md:gap-10 fade-up"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Left label */}
              <div className="md:w-1/3 w-full">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">{s.title}</h3>
              </div>

              {/* Right content */}
              <div className="md:w-2/3 w-full">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-5 text-white leading-tight">
                  {s.headline}
                </h4>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fade-in animation styles */}
      <style jsx>{`
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}