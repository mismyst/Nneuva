"use client";

import React from "react";

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
      "Stop bleeding money on ads that lead nowhere. We design sites that convert cold traffic into booked calls without you lifting a finger."
  },
  {
    title: "App Development",
    headline: "Beautiful apps that actually get used",
    description:
      "From idea to store release — performant mobile apps with thoughtful UX that keep users coming back and reduce churn."
  },
  {
    title: "SaaS",
    headline: "Build a scalable SaaS that grows with customers",
    description:
      "Design and develop resilient SaaS platforms: billing, multi-tenant architecture, telemetry, and automated CI/CD for rapid iteration."
  },
  {
    title: "B2B Development",
    headline: "Custom B2B systems that power operations",
    description:
      "Enterprise integrations, secure APIs, complex workflows and analytics — we build B2B products that actually solve business problems."
  }
];

export default function Services() {
  return (
    <section className="w-full text-white bg-black py-20 px-6 md:px-16 lg:px-28">
      {/* Page heading */}
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">Services</h2>

        {/* Rows */}
        <div className="divide-y divide-gray-800/60">
          {SERVICES.map((s, idx) => (
            <div
              key={s.title}
              className="py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center"
            >
              {/* Left label */}
              <div className="md:w-1/4 w-full mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-normal">{s.title}</h3>
              </div>

              {/* Right content */}
              <div className="md:w-3/4 w-full">
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-white">
                  {s.headline}
                </h4>
                <p className="text-sm md:text-base text-gray-400 max-w-3xl leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}