"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "../lib/supabase";
import { ContactCta, SiteFooter, useGalleryMenu } from "./components/SiteChrome";

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
  contactTitle: "Get in touch", contactText: "Send us a message, and we'll set up a free discovery call to start planning your dream elopement.", contactEmail: "hello@ourjune.photo", contactImage: "/hero-alt.jpg",
  footerImages: ["/portrait-1.jpg","/portrait-4.jpg","/horizontal-3.jpg","/hero.jpg"], instagramHandle: "@OURJUNE", copyright: "© 2026 OUR JUNE",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [content, setContent] = useState<typeof homeFallback | null>(null);
  const galleryItems = useGalleryMenu();

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    const loadHomeContent = () => {
      getBrowserSupabase()?.from("site_content").select("value").eq("key", "home").maybeSingle().then(({ data }) => {
        if (data?.value) {
          const nextContent = data.value as typeof homeFallback;
          const heroImage = new Image();
          const showContent = () => setContent(nextContent);
          heroImage.addEventListener("load", showContent, { once: true });
          heroImage.addEventListener("error", showContent, { once: true });
          heroImage.src = nextContent.heroImage;
          if (heroImage.complete) showContent();
        }
      });
    };
    const channel = new BroadcastChannel("ourjune-content");
    channel.onmessage = event => { if (event.data?.key === "home") loadHomeContent(); };
    const refreshWhenVisible = () => { if (document.visibilityState === "visible") loadHomeContent(); };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    document.addEventListener("visibilitychange", refreshWhenVisible);
    loadHomeContent();
    return () => {
      window.removeEventListener("scroll", updateHeader);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      channel.close();
    };
  }, []);

  if (!content) {
    return <main className="home-loading" aria-busy="true" aria-label="Loading Our June" />;
  }

  const activeTestimonials = content.testimonials.length ? content.testimonials : testimonials;
  const testimonial = activeTestimonials[testimonialIndex % activeTestimonials.length];

  return (
    <main className="home-content" id="top">
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
                  {galleryItems.map(item => <a key={item.key} href={`/${item.slug}`} onClick={() => setMenuOpen(false)}>{item.title}</a>)}
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
            <a className="text-link" href="/about">Read More <span>↗</span></a>
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
        <a className="outline-button" href="/Portfolio">See Portfolio <span>↗</span></a>
      </section>

      <ContactCta content={content} />

      <SiteFooter content={content} />
    </main>
  );
}
