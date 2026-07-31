"use client";

import { useEffect, useState } from "react";

const nav = ["Home", "About", "Services", "Testimonials", "Portfolio", "Contact"];

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
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}{item === "Portfolio" && <i />}
              </a>
            ))}
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

      <section className="services" id="services">
        <div className="services-image" />
        <div className="services-copy">
          <span className="section-kicker">03 — THE EXPERIENCE</span>
          <h2>Your story,<br />honestly told.</h2>
          <p>From windswept elopements to slow mornings at home, we make space for you to be fully present while we preserve the feeling of it all.</p>
          <div className="service-list">
            <span>Elopements <b>01</b></span>
            <span>Weddings <b>02</b></span>
            <span>Couples <b>03</b></span>
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <span className="section-kicker">LET&apos;S MAKE SOMETHING TIMELESS</span>
        <h2>Get in touch</h2>
        <p>Send us a message, and we&apos;ll set up a free discovery call to start planning your dream elopement.</p>
        <a className="light-button" href="mailto:hello@ourjune.photo">Let&apos;s Connect <span>↗</span></a>
      </section>

      <footer>
        <div>
          <span>FOLLOW US ON INSTAGRAM</span>
          <a href="https://www.instagram.com/pixieset/">@PIXIESET</a>
        </div>
        <div className="footer-bottom">
          <strong>OUR JUNE</strong>
          <p>© 2026 OUR JUNE — PHOTOGRAPHY FOR THE WILDLY IN LOVE</p>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
