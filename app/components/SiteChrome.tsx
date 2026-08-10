"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "../../lib/supabase";
import { normalizeGallerySlug, type GalleryMenuItem } from "../../lib/content";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Service", "/service"],
  ["Testimonials", "/testimonials"],
  ["Portfolio", "/Portfolio"],
  ["Contact", "/contact"],
];

const galleryMenuFallback: GalleryMenuItem[] = [1, 2, 3, 4].map(number => ({ key: `gallery-${number}`, title: `Gallery ${number}`, slug: `gallery-${number}` }));

export function useGalleryMenu() {
  const [items, setItems] = useState(galleryMenuFallback);
  useEffect(() => {
    let active = true;
    getBrowserSupabase()?.from("site_content").select("key,value,sort_order").eq("page", "Gallery").order("sort_order").then(({ data }) => {
      if (!active || !data?.length) return;
      setItems(data.map(row => ({
        key: row.key,
        title: String(row.value?.menuTitle || row.value?.title || row.key),
        slug: normalizeGallerySlug(String(row.value?.slug || row.key), row.key),
      })));
    });
    return () => { active = false; };
  }, []);
  return items;
}

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const galleryItems = useGalleryMenu();

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
              {galleryItems.map(item => <a key={item.key} href={`/${item.slug}`} onClick={() => setOpen(false)}>{item.title}</a>)}
            </div>
          </div>
        ) : <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}

type SharedChromeContent = {
  contactTitle: string;
  contactText: string;
  contactImage: string;
  footerImages: string[];
  instagramHandle: string;
  copyright: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
};

const sharedFallback: SharedChromeContent = {
  contactTitle: "Get in touch",
  contactText: "Send us a message, and we’ll set up a free discovery call to start planning your dream photoshoot.",
  contactImage: "/hero-alt.jpg",
  footerImages: ["/portrait-1.jpg", "/portrait-4.jpg", "/horizontal-3.jpg", "/hero.jpg"],
  instagramHandle: "@OURJUNE",
  copyright: "© 2026 OUR JUNE",
  facebookUrl: "https://www.facebook.com/",
  instagramUrl: "https://www.instagram.com/",
  whatsappUrl: "https://wa.me/84555583655",
};

function normalizeSharedContent(value?: Partial<SharedChromeContent>): SharedChromeContent {
  const sourceImages = value?.footerImages?.length ? value.footerImages : sharedFallback.footerImages;
  return {
    contactTitle: value?.contactTitle || sharedFallback.contactTitle,
    contactText: value?.contactText || sharedFallback.contactText,
    contactImage: value?.contactImage || sharedFallback.contactImage,
    footerImages: Array.from({ length: 4 }, (_, index) => sourceImages[index % sourceImages.length]),
    instagramHandle: value?.instagramHandle || sharedFallback.instagramHandle,
    copyright: value?.copyright || sharedFallback.copyright,
    facebookUrl: value?.facebookUrl || sharedFallback.facebookUrl,
    instagramUrl: value?.instagramUrl || sharedFallback.instagramUrl,
    whatsappUrl: value?.whatsappUrl || sharedFallback.whatsappUrl,
  };
}

function useSharedChromeContent(provided?: Partial<SharedChromeContent>) {
  const [content, setContent] = useState(() => normalizeSharedContent(provided));

  useEffect(() => {
    if (provided) {
      setContent(normalizeSharedContent(provided));
      return;
    }
    let active = true;
    getBrowserSupabase()?.from("site_content").select("value").eq("key", "home").maybeSingle().then(({ data }) => {
      if (active && data?.value) setContent(normalizeSharedContent(data.value as Partial<SharedChromeContent>));
    });
    return () => { active = false; };
  }, [provided]);

  return content;
}

export function ContactCta({ content: provided }: { content?: Partial<SharedChromeContent> }) {
  const content = useSharedChromeContent(provided);
  return (
    <section className="inner-contact image-contact" style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.58)),url("${content.contactImage}")` }}>
      <h2>{content.contactTitle}</h2>
      <p>{content.contactText}</p>
      <a href="/contact">Let’s Connect</a>
    </section>
  );
}

export function SiteFooter({ content: provided }: { content?: Partial<SharedChromeContent> }) {
  const content = useSharedChromeContent(provided);
  return (
    <footer className="site-footer inner-footer">
      <div className="footer-gallery" aria-label="Selected Instagram photographs">
        {content.footerImages.map((image, index) => <img src={image} alt={`Our June story ${index + 1}`} key={`${image}-${index}`} />)}
      </div>
      <div className="footer-social">
        <span>FOLLOW US ON INSTAGRAM</span>
        <a className="instagram-handle" href={content.instagramUrl} target="_blank" rel="noreferrer">{content.instagramHandle}</a>
        <div className="social-links">
          <a className="facebook-icon" href={content.facebookUrl} aria-label="Facebook" target="_blank" rel="noreferrer">f</a>
          <a className="instagram-icon" href={content.instagramUrl} aria-label="Instagram" target="_blank" rel="noreferrer"><span /></a>
          <a className="whatsapp-icon" href={content.whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noreferrer"><img src="/whatsapp-icon.png" alt="" /></a>
        </div>
      </div>
      <div className="footer-bottom"><p>{content.copyright}</p><a href="#top" aria-label="Back to top">↑</a></div>
    </footer>
  );
}
