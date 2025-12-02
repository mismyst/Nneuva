// components/CalEmbed.tsx
"use client";

import React from "react";

type CalEmbedProps = {
  calLink?: string;
  height?: string | number;
};

export default function CalEmbed({
  calLink = "neuva-forge/strategycall",
  height = 700,
}: CalEmbedProps) {
  const computedHeight = typeof height === "number" ? `${height}px` : height;
  
  // Direct iframe embed - most reliable method
  const iframeSrc = `https://cal.com/${calLink}?embed=true&theme=dark&hideEventTypeDetails=false&layout=month_view`;

  return (
    <div style={{ width: "100%", minHeight: computedHeight }}>
      <iframe
        src={iframeSrc}
        title="Schedule a Strategy Call"
        style={{
          width: "100%",
          height: computedHeight,
          border: "none",
          borderRadius: "12px",
        }}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}