"use client";

import { useState } from "react";

type Review = { quote: string; name: string };

export function ClientSaySlider({ label, reviews }: { label: string; reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  return <section className="client-say">
    <span className="page-label">{label}</span>
    <div className="client-say-slide" key={index}>
      <blockquote>{review.quote}</blockquote>
      <div className="client-say-footer">
        <div className="client-say-controls">
          <button type="button" aria-label="Previous client review" onClick={() => setIndex((index - 1 + reviews.length) % reviews.length)}>←</button>
          <button type="button" aria-label="Next client review" onClick={() => setIndex((index + 1) % reviews.length)}>→</button>
        </div>
        <cite>{review.name}</cite>
      </div>
    </div>
  </section>;
}
