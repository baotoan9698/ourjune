"use client";

import { useEffect, useState } from "react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Service", "/service"],
  ["Testimonials", "/testimonials"],
  ["Portfolio", "/Portfolio"],
  ["Contact", "/contact"],
];

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header subpage-header${transparent && !scrolled ? " transparent" : ""}${scrolled ? " scrolled" : ""}`}>
      <a className="logo" href="/">OUR JUNE</a>
      <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {links.map(([label, href]) => label === "Portfolio" ? (
          <div className="nav-dropdown" key={href}>
            <a className="gallery-desktop-link" href={href}>Portfolio <span aria-hidden="true">+</span></a>
            <div className="gallery-mobile-row"><a href={href} onClick={() => setOpen(false)}>Portfolio</a><button className="gallery-mobile-toggle" type="button" aria-label="Toggle portfolio galleries" aria-expanded={galleryOpen} onClick={() => setGalleryOpen(!galleryOpen)}><span aria-hidden="true">+</span></button></div>
            <div className={`nav-submenu${galleryOpen ? " mobile-open" : ""}`}>
              {[1,2,3,4].map(number => <a key={number} href={`/gallery-${number}`} onClick={() => setOpen(false)}>Gallery {number}</a>)}
            </div>
          </div>
        ) : <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}

export function ContactCta({ image = false }: { image?: boolean }) {
  return (
    <section className={`inner-contact${image ? " image-contact" : ""}`}>
      <h2>Get in touch</h2>
      <p>Send us a message, and we’ll set up a free discovery call to start planning your dream photoshoot.</p>
      <a href="/contact">Let’s Connect</a>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer inner-footer">
      <div className="footer-gallery" aria-label="Selected Instagram photographs">
        <img src="/portrait-1.jpg" alt="Our June wedding story" />
        <img src="/portrait-4.jpg" alt="Our June couple portrait" />
        <img src="/horizontal-3.jpg" alt="Our June beach ceremony" />
        <img src="/hero.jpg" alt="Our June cinematic wedding" />
      </div>
      <div className="footer-social">
        <span>FOLLOW US ON INSTAGRAM</span>
        <a className="instagram-handle" href="https://www.instagram.com/">@OURJUNE</a>
        <div className="social-links">
          <a className="facebook-icon" href="https://www.facebook.com/" aria-label="Facebook">f</a>
          <a className="instagram-icon" href="https://www.instagram.com/" aria-label="Instagram"><span /></a>
        </div>
      </div>
      <div className="footer-bottom"><p>© 2026 OUR JUNE</p><a href="#top" aria-label="Back to top">↑</a></div>
    </footer>
  );
}
