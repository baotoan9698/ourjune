"use client";

import { useEffect, useState } from "react";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Service", "/service"],
  ["Testimonials", "/testimonials"],
  ["Portfolio", "/Portfolio"],
  ["Contact", "/contact"],
];

const testimonials = [
  {
    quote:
      "Being photographed by these two made all the difference. They just get it. The little glances, the unspoken words. Our photos reflect the kind of love and connection only someone who understands that bond can capture.",
    names: "Justin & Nadia",
    image: "/horizontal-3.jpg",
  },
  {
    quote:
      "From the first conversation, we felt completely at ease. Nothing felt staged or rushed. They gave us space to be ourselves, and somehow turned every quiet, imperfect moment into something we will treasure forever.",
    names: "Maya & Elliot",
    image: "/horizontal-1.jpg",
  },
  {
    quote:
      "Looking through our gallery felt like reliving the entire day. The movement, the laughter, even the stillness between moments — it is all there. These photographs feel unmistakably like us.",
    names: "Sophie & Daniel",
    image: "/hero-alt.jpg",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = testimonials[testimonialIndex];

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <main>
      <section className="hero" id="home">
        <header className={`site-header${scrolled ? " scrolled" : ""}`}>
          <a className="logo" href="#home">OUR JUNE</a>
          <button
            className="menu-button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
          <nav className={menuOpen ? "nav open" : "nav"}>
            {nav.map(([item, href]) => item === "Portfolio" ? (
              <div className="nav-dropdown" key={href}>
                <a className="gallery-desktop-link" href={href}>Portfolio <span aria-hidden="true">+</span></a>
                <div className="gallery-mobile-row"><a href={href} onClick={() => setMenuOpen(false)}>Portfolio</a><button className="gallery-mobile-toggle" type="button" aria-label="Toggle portfolio galleries" aria-expanded={galleryOpen} onClick={() => setGalleryOpen(!galleryOpen)}><span aria-hidden="true">+</span></button></div>
                <div className={`nav-submenu${galleryOpen ? " mobile-open" : ""}`}>
                  {[1,2,3,4].map(number => <a key={number} href={`/gallery-${number}`} onClick={() => setMenuOpen(false)}>Gallery {number}</a>)}
                </div>
              </div>
            ) : <a key={href} href={href} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </nav>
        </header>
        <div className="hero-copy">
          <h1>Photographs of love,<br />joy, and moments of<br />life that feel like a<br />movie</h1>
          <p>Moody, cinematic, and deeply atmospheric, our photography renders the feeling within every moment — how it unfolds, how it lingers. We create images that go beyond the surface and feel as immersive as the memories themselves.</p>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about">↓</a>
      </section>

      <section className="about section-pad" id="about">
        <div className="section-kicker">01 — THE STORY</div>
        <div className="about-grid">
          <div className="image-stack">
            <img className="about-tall" src="/portrait-1.jpg" alt="Couple in the desert" />
            <img className="about-small" src="/portrait-2.jpg" alt="Intimate portrait" />
          </div>
          <div className="about-copy">
            <h2>About us</h2>
            <p>Hello! We&apos;re Alex and Emma, a husband-and-wife duo based in Joshua Tree, California. We fell in love with this place, the raw beauty of the desert, and its quiet vastness. That sense of depth and stillness shapes everything we do in our work.</p>
            <p>For us, photography means connection — with one another, with nature, and with parts of yourself you have yet to discover. Feel the same way? Let&apos;s get to know each other better!</p>
            <a className="text-link" href="#contact">Read More <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="testimonial" id="testimonials">
        <div className="testimonial-card" key={`copy-${testimonialIndex}`}>
          <span className="eyebrow">KIND WORDS</span>
          <blockquote>{testimonial.quote}</blockquote>
          <div className="testimonial-footer">
            <strong>{testimonial.names}</strong>
            <div className="testimonial-controls">
              <button
                aria-label="Previous testimonial"
                onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}
              >
                ←
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}
              >
                →
              </button>
            </div>
          </div>
        </div>
        <div className="testimonial-visual">
          <img key={`image-${testimonialIndex}`} src={testimonial.image} alt={`${testimonial.names} love story`} />
        </div>
      </section>

      <section className="quote">
        <p>Mystery is not about traveling to new places but about looking with new eyes.</p>
        <span>MARCEL PROUST</span>
      </section>

      <section className="works section-pad" id="portfolio">
        <div className="works-head">
          <div>
            <span className="section-kicker">02 — SELECTED STORIES</span>
            <h2>Our Works</h2>
          </div>
          <p>A collection of honest moments, quiet gestures, and stories that deserve to live beyond the day they happened.</p>
        </div>
        <div className="gallery">
          <a className="work-card card-portrait" href="#contact">
            <img src="/portrait-4.jpg" alt="Editorial portrait" />
            <span><b>01</b> Portraits <i>↗</i></span>
          </a>
          <a className="work-card card-love" href="#contact">
            <img src="/horizontal-1.jpg" alt="Love story" />
            <span><b>02</b> Love Stories <i>↗</i></span>
          </a>
          <a className="work-card card-wedding" href="#contact">
            <img src="/vertical-2.jpg" alt="Wedding moment" />
            <span><b>03</b> Weddings <i>↗</i></span>
          </a>
        </div>
        <a className="outline-button" href="#contact">See Portfolio <span>↗</span></a>
      </section>

      <section className="contact" id="contact">
        <div className="contact-content">
          <h2>Get in touch</h2>
          <p>Send us a message, and we&apos;ll set up a free discovery call to start planning your dream elopement.</p>
          <a className="light-button" href="mailto:hello@ourjune.photo">Let&apos;s Connect</a>
        </div>
      </section>

      <footer className="site-footer">
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
            <a className="instagram-icon" href="https://www.instagram.com/" aria-label="Instagram">
              <span />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 OUR JUNE</p>
          <a href="#home" aria-label="Back to top">↑</a>
        </div>
      </footer>
    </main>
  );
}
