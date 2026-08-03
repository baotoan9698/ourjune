import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const images=["/portrait-2.jpg","/horizontal-3.jpg","/portrait-4.jpg","/hero-alt.jpg","/horizontal-1.jpg","/vertical-2.jpg","/hero.jpg","/portrait-1.jpg","/horizontal-3.jpg","/portrait-2.jpg","/horizontal-1.jpg"];
export default function GalleryPage(){return <main className="subpage" id="top"><SiteHeader transparent/><div>
  <section className="gallery-hero"><div className="gallery-hero-copy"><h1>Love Stories</h1><p>Every relationship is unique. We love capturing the moments that define your story together, whether it&apos;s a proposal, engagement, or simply a quiet day by the ocean.</p></div></section>
  <section className="masonry">{images.map((src,i)=><img key={`${src}-${i}`} src={src} alt={`Our June love story ${i+1}`}/>)}</section>
  <ContactCta/><SiteFooter/>
 </div></main>}
