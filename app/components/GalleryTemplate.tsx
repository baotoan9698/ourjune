import { ContactCta, SiteFooter, SiteHeader } from "./SiteChrome";

type GalleryTemplateProps = {
  title: string;
  description: string;
  hero: string;
  images: string[];
};

export function GalleryTemplate({ title, description, hero, images }: GalleryTemplateProps) {
  const sourceImages = images.length ? images : [hero];
  const galleryImages = Array.from({ length: 16 }, (_, index) => sourceImages[index % sourceImages.length]);

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
        {galleryImages.map((src, i) => <img key={`${src}-${i}`} src={src} alt={`${title} photograph ${i + 1}`} />)}
      </section>
      <ContactCta />
      <SiteFooter />
    </div>
  </main>;
}
