import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const collections = [
  { title: "Portraits", href: "/gallery-2", image: "/portrait-4.jpg" },
  { title: "Love Stories", href: "/gallery-1", image: "/horizontal-3.jpg" },
  { title: "Weddings", href: "/gallery-3", image: "/hero-alt.jpg" },
  { title: "Editorial", href: "/gallery-4", image: "/horizontal-1.jpg" },
];

export default function PortfolioPage() {
  return <main className="subpage portfolio-page" id="top">
    <SiteHeader transparent />
    <section className="portfolio-hero">
      <div className="portfolio-hero-copy">
        <h1>Our Works</h1>
        <p>Take a look through our collection of stories we&apos;ve had the privilege of capturing. We hope these images give you a glimpse into our approach and open excitement for your own photography journey with us.</p>
      </div>
    </section>
    <section className="portfolio-collections">
      {collections.map((collection, index) => <a className={`portfolio-project project-${index + 1}`} href={collection.href} key={collection.href}>
        <span>View Gallery</span>
        <img src={collection.image} alt={collection.title} />
        <h2>{collection.title}</h2>
      </a>)}
    </section>
    <ContactCta image />
    <SiteFooter />
  </main>;
}
