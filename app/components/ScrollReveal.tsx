"use client";

import { useEffect } from "react";

const targets = [
  "main:not(.admin-shell) section:not(.hero):not(.gallery-hero):not(.service-hero):not(.portfolio-hero) > *",
  "main:not(.admin-shell) .work-card",
  "main:not(.admin-shell) .package-card",
  "main:not(.admin-shell) .portfolio-project",
  "main:not(.admin-shell) .gallery-tile",
  "main:not(.admin-shell) .testimonial-item",
  "main:not(.admin-shell) .faq-row",
  "main:not(.admin-shell) .footer-gallery img",
  "main:not(.admin-shell) .footer-social",
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("reveal-ready");
    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    const register = () => {
      document.querySelectorAll<HTMLElement>(targets).forEach((element, index) => {
        if (observed.has(element) || element.closest(".gallery-lightbox")) return;
        observed.add(element);
        element.classList.add("scroll-reveal", index % 2 === 0 ? "reveal-left" : "reveal-right");
        element.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
        observer.observe(element);
      });
    };

    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
