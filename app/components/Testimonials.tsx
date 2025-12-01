"use client";

import MagicBento from "./Magicbento"; // ensure filename matches (Magicbento.tsx / MagicBento.tsx)

// Quote Icon Component
const QuoteIcon = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="min-h-screen w-screen bg-black text-white pt-16 md:pt-20">
      {/* Heading Section */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="flex items-center gap-4">
          <QuoteIcon className="w-10 h-10 md:w-12 md:h-12 text-[#8d2020]" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Testimonials
          </h2>
          <QuoteIcon className="w-10 h-10 md:w-12 md:h-12 text-[#8d2020] rotate-180" />
        </div>
      </div>

      {/* wrapper ensures full viewport height/width */}
      <div className="h-screen w-full relative">
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>

      {/* Override internal width constraint so the bento grid stretches full width */}
      <style jsx global>{`
        /* Make the bento section full-width (overrides internal max-width) */
        .bento-section {
          max-width: none !important;
          width: 100% !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }

        /* Ensure the responsive grid uses full available width */
        .card-responsive {
          max-width: none !important;
          width: 100% !important;
          margin: 0 auto !important;
        }

        /* Optional: let each card stretch more on large screens */
        @media (min-width: 1024px) {
          .card-responsive .card {
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  );
}
