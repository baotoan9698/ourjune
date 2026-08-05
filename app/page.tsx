"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "../lib/supabase";

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

const homeFallback = {
  heroTitle: "Photographs of love,\njoy, and moments of\nlife that feel like a\nmovie",
  heroDescription: "Moody, cinematic, and deeply atmospheric, our photography renders the feeling within every moment — how it unfolds, how it lingers.",
  heroImage: "/hero.jpg", storyLabel: "01 — THE STORY", aboutTitle: "About us",
  aboutText1: "Hello! We're Alex and Emma, a husband-and-wife duo based in Joshua Tree, California. We fell in love with this place, the raw beauty of the desert, and its quiet vastness.",
  aboutText2: "For us, photography means connection — with one another, with nature, and with parts of yourself you have yet to discover.",
  aboutImage1: "/portrait-1.jpg", aboutImage2: "/portrait-2.jpg", testimonials,
  quote: "Mystery is not about traveling to new places but about looking with new eyes.", quoteAuthor: "MARCEL PROUST",
  worksLabel: "02 — SELECTED STORIES", worksTitle: "Our Works", worksDescription: "A collection of honest moments, quiet gestures, and stories that deserve to live beyond the day they happened.",
  works: [{title:"Portraits",image:"/portrait-4.jpg",href:"/gallery-2"},{title:"Love Stories",image:"/horizontal-1.jpg",href:"/gallery-1"},{title:"Weddings",image:"/vertical-2.jpg",href:"/gallery-3"}],
  contactTitle: "Get in touch", contactText: "Send us a message, and we'll set up a free discovery call to start planning your dream elopement.", contactEmail: "hello@ourjune.photo",
  footerImages: ["/portrait-1.jpg","/portrait-4.jpg","/horizontal-3.jpg","/hero.jpg"], instagramHandle: "@OURJUNE", copyright: "© 2026 OUR JUNE",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [content, setContent] = useState(homeFallback);
  const activeTestimonials = content.testimonials.length ? content.testimonials : testimonials;
  const testimonial = activeTestimonials[testimonialIndex % activeTestimonials.length];

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    getBrowserSupabase()?.from("site_content").select("value").eq("key", "home").maybeSingle().then(({ data }) => {
      if (data?.value) setContent(data.value as typeof homeFallback);
    });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <main>
      <section className="hero" id="home" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.5)),url("${content.heroImage}")`}}>
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
          <h1>{content.heroTitle.split("\n").map(line=><span key={line}>{line}<br/></span>)}</h1>
          <p>{content.heroDescription}</p>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about">↓</a>
      </section>

      <section className="about section-pad" id="about">
        <div className="section-kicker">{content.storyLabel}</div>
        <div className="about-grid">
          <div className="image-stack">
            <img className="about-tall" src={content.aboutImage1} alt="Couple in the desert" />
            <img className="about-small" src={content.aboutImage2} alt="Intimate portrait" />
          </div>
          <div className="about-copy">
            <h2>{content.aboutTitle}</h2>
            <p>{content.aboutText1}</p>
            <p>{content.aboutText2}</p>
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
                onClick={() => setTestimonialIndex((testimonialIndex - 1 + activeTestimonials.length) % activeTestimonials.length)}
              >
                ←
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => setTestimonialIndex((testimonialIndex + 1) % activeTestimonials.length)}
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
        <p>{content.quote}</p>
        <span>{content.quoteAuthor}</span>
      </section>

      <section className="works section-pad" id="portfolio">
        <div className="works-head">
          <div>
            <span className="section-kicker">{content.worksLabel}</span>
            <h2>{content.worksTitle}</h2>
          </div>
          <p>{content.worksDescription}</p>
        </div>
        <div className="gallery">
          {content.works.map((work,index)=><a className={`work-card ${["card-portrait","card-love","card-wedding"][index] ?? ""}`} href={work.href} key={work.title}><img src={work.image} alt={work.title}/><span><b>{String(index+1).padStart(2,"0")}</b> {work.title} <i>↗</i></span></a>)}
        </div>
        <a className="outline-button" href="#contact">See Portfolio <span>↗</span></a>
      </section>

      <section className="contact" id="contact">
        <div className="contact-content">
          <h2>{content.contactTitle}</h2>
          <p>{content.contactText}</p>
          <a className="light-button" href={`mailto:${content.contactEmail}`}>Let&apos;s Connect</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-gallery" aria-label="Selected Instagram photographs">
          {content.footerImages.map((image,index)=><img src={image} alt={`Our June story ${index+1}`} key={`${image}-${index}`}/>)}
        </div>
        <div className="footer-social">
          <span>FOLLOW US ON INSTAGRAM</span>
          <a className="instagram-handle" href="https://www.instagram.com/">{content.instagramHandle}</a>
          <div className="social-links">
            <a className="facebook-icon" href="https://www.facebook.com/" aria-label="Facebook">f</a>
            <a className="instagram-icon" href="https://www.instagram.com/" aria-label="Instagram">
              <span />
            </a>
            <a className="whatsapp-icon" href="https://wa.me/84555583655" aria-label="WhatsApp" target="_blank" rel="noreferrer"><img src="/whatsapp-icon.png" alt="" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{content.copyright}</p>
          <a href="#home" aria-label="Back to top">↑</a>
        </div>
      </footer>
    </main>
  );
}
