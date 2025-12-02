// components/PlansCards.tsx
"use client";

import React from "react";
//new
const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
type PlanCardProps = {
  title: string;
  subtitle?: string;
  price: string;
  bullets: string[];
  highlightText?: string;
  ctaText: string;
};

export default function PlansCards() {
  return (
    <section className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-28 bg-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <h2
          aria-label="Plans"
          className="font-extrabold uppercase leading-[0.9] text-white"
          style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)" }}
        >
          <div>PLANS</div>
        </h2>
        
        {/* subtle dividing line */}
        <div className="mt-4 mb-10 sm:mb-12 md:mb-16">
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <PlanCard
            title="Starter"
            subtitle="Build Essentials"
            price="$299 – $499"
            bullets={[
              "Clean, responsive website (up to 5 pages)",
              "Mobile-first UI",
              "Basic brand messaging assistance",
              "Contact form + essential integrations",
              "Basic SEO setup",
              "7-day post-launch support",
              "Fast delivery & secure hosting guidance",
            ]}
            ctaText="Get Starter"
          />

          <PlanCard
            title="Growth"
            subtitle="Smart Business Suite"
            price="$699 – $1,299"
            bullets={[
              "Everything in Starter +",
              "Custom website or web app (8–15 pages/screens)",
              "Tailor-made UI/UX design",
              "Better animations & smooth transitions",
              "Payment gateway / CRM / WhatsApp / API integrations",
              "Basic admin dashboard (optional)",
              "Speed optimization + SEO improvements",
              "30-day support",
            ]}
            ctaText="Talk Growth"
          />

          <PlanCard
            title="Pro"
            subtitle="Digital Transformation Suite"
            price="$1,999 – $4,999+"
            highlightText="High-ticket — perfect for enterprise-level work"
            bullets={[
              "Everything in Growth +",
              "Full custom web platform / portal / SaaS system",
              "AI workflow automation",
              "Custom CRM, booking, inventory or staff systems",
              "Database architecture + secure authentication",
              "Advanced dashboards & analytics",
              "Priority support + monthly improvements",
              "45–90 day extended assistance",
            ]}
            ctaText="Request Proposal"
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  title,
  subtitle,
  price,
  bullets,
  highlightText,
  ctaText,
}: PlanCardProps) {
  return (
    <article
      className="
        h-full flex flex-col
        rounded-2xl border border-white/10 
        overflow-hidden bg-black
        shadow-[0_6px_20px_rgba(0,0,0,0.45)]
        transition-transform duration-300 hover:scale-[1.02]
      "
    >
      {/* 🔥 Updated top header with clean red gradient ONLY */}
      <div
        className="px-5 sm:px-6 md:px-8 py-6 sm:py-8 text-white"
        style={{
          background:
            "linear-gradient(135deg, #8d2020 0%, #6a1515 60%, #3a0a0a 100%)",
        }}
      >
        <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm sm:text-base text-white/85 mt-1">{subtitle}</p>
        )}

        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/75">Starts at</p>
        <p className="text-2xl sm:text-3xl font-bold">{price}</p>

        {highlightText && (
          <p className="mt-2 text-xs sm:text-sm text-white/80">{highlightText}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Body */}
      <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 md:p-8">
        <ul className="space-y-3 sm:space-y-4 mb-8">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-white/90">
              <span className="mt-1 text-emerald-400 flex-shrink-0">
                <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span className="text-sm sm:text-base leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        <button
          className="
            w-full px-4 py-3 sm:py-4 rounded-full
            bg-gray-700 hover:bg-gray-600
            text-white text-base sm:text-lg font-semibold
            shadow-[0_4px_14px_rgba(0,0,0,0.35)]
            transition
          "
        >
          {ctaText}
        </button>
      </div>
    </article>
  );
}