// components/PlansCards.tsx
"use client";

import React from "react";

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
    <section className="w-full px-6 py-16 bg-black">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10">
          Plans
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
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
        rounded-xl border border-white/10 
        overflow-hidden bg-black
        shadow-[0_6px_20px_rgba(0,0,0,0.45)]
      "
    >
      {/* 🔥 Updated top header with clean red gradient ONLY */}
      <div
        className="px-6 py-6 text-white"
        style={{
          background:
            "linear-gradient(135deg, #8d2020 0%, #6a1515 60%, #3a0a0a 100%)",
        }}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-white/85 mt-1">{subtitle}</p>
        )}

        <p className="mt-4 text-sm text-white/75">Starts at</p>
        <p className="text-xl font-bold">{price}</p>

        {highlightText && (
          <p className="mt-2 text-xs text-white/80">{highlightText}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Body */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <ul className="space-y-3 mb-6">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-white/90">
              <span className="mt-1 text-emerald-400">
                <CheckIcon />
              </span>
              <span className="text-sm leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        <button
          style={{ backgroundColor: "#008800" }}
          className="
            w-full px-4 py-3 rounded-md
            text-white font-semibold
            shadow-[0_4px_14px_rgba(0,136,0,0.35)]
            hover:brightness-95 transition
          "
        >
          {ctaText}
        </button>
      </div>
    </article>
  );
}