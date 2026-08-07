"use client";

import { useEffect, useState } from "react";
import { ContactCta, SiteFooter, SiteHeader } from "./SiteChrome";

type GalleryTemplateProps = {
  title: string;
  description: string;
  hero: string;
  images: string[];
};

export function GalleryTemplate({ title, description, hero, images }: GalleryTemplateProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sourceImages = images.length ? images : [hero];
  const galleryImages = Array.from({ length: 16 }, (_, index) => sourceImages[index % sourceImages.length]);
  const showPrevious = () => setSelectedIndex(current => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => setSelectedIndex(current => current === null ? null : (current + 1) % galleryImages.length);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") setSelectedIndex(current => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
      if (event.key === "ArrowRight") setSelectedIndex(current => current === null ? null : (current + 1) % galleryImages.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [selectedIndex, galleryImages.length]);

  return <main className="subpage" id="top">
    <SiteHeader transparent />
    <div>
      <section
        className="gallery-hero"
        style={{ backgroundImage: `linear-gradient(180deg,transparent 48%,rgba(0,0,0,.68)),url("${hero}")` }}
      >
        <div className="gallery-hero-copy"><h1>{title}</h1><p>{description}</p></div>
      </section>
      <section className="masonry">
        {galleryImages.map((src, i) => <button className="gallery-tile" type="button" key={`${src}-${i}`} onClick={() => setSelectedIndex(i)} aria-label={`Open ${title} photograph ${i + 1}`}><img src={src} alt={`${title} photograph ${i + 1}`} /></button>)}
      </section>
      <ContactCta />
      <SiteFooter />
    </div>
    {selectedIndex !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Full-size photograph" onClick={() => setSelectedIndex(null)}>
      <button className="gallery-lightbox-close" type="button" aria-label="Close photograph" onClick={() => setSelectedIndex(null)}>×</button>
      <button className="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Previous photograph" onClick={event => { event.stopPropagation(); showPrevious(); }}>←</button>
      <img src={galleryImages[selectedIndex]} alt={`${title} photograph ${selectedIndex + 1} full size`} onClick={event => event.stopPropagation()} />
      <button className="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Next photograph" onClick={event => { event.stopPropagation(); showNext(); }}>→</button>
    </div>}
  </main>;
}
