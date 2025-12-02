"use client";

import MagicBento from "./Magicbento"; // ensure filename matches (Magicbento.tsx / MagicBento.tsx)
//new 's
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
    <section className="min-h-screen w-full bg-black text-white py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Heading Section - OUR WORK style */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 mb-8 md:mb-12">
        <div className="max-w-[1200px]">
          {/* Quote icon before heading */}
          <div className="mb-2">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#8d2020]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
          </div>
          <h2
            aria-label="Testimonials"
            className="font-extrabold uppercase leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            <div>TESTI-</div>
            <div className="mt-[-0.06em]">MONIALS</div>
          </h2>
          
          {/* subtle dividing line */}
          <div className="mt-4">
            <div className="h-[1px] w-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Bento grid wrapper - responsive height */}
      <div className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] w-full relative px-2 sm:px-4">
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
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }

        /* Ensure the responsive grid uses full available width */
        .card-responsive {
          max-width: none !important;
          width: 100% !important;
          margin: 0 auto !important;
        }
        
        /* Mobile-first responsive adjustments */
        @media (max-width: 599px) {
          .bento-section {
            padding: 0.25rem !important;
          }
          
          .card-responsive {
            gap: 0.75rem !important;
          }
          
          .card-responsive .card {
            min-height: 160px !important;
            padding: 1rem !important;
            border-radius: 12px !important;
          }
          
          .card-responsive .card p {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
        }
        
        @media (min-width: 600px) and (max-width: 1023px) {
          .card-responsive .card {
            min-height: 180px !important;
          }
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
