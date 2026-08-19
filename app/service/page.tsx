import { getSiteContent } from "../../lib/content";
import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const fallback = {
  heroTitle:"More details about our services", heroText:"We believe your photos should feel as natural and honest as possible. Whether it's a portrait session, an intimate elopement, or a large celebration with loved ones, we capture it in a way that feels effortless and true to you.", heroImage:"/horizontal-1.jpg",
  packages:[
    {title:"Portraits Package",text:"Up to 2 Hours\n40–80 Edited Photos\n2 Prints\nOnline gallery\n$ 800",image:"/portrait-2.jpg"},
    {title:"Wedding Package",text:"Up to 10 Hours\n600+ Edited Photos\n2 Photographers\n12×12 Photo Album\n$ 4,500",image:"/hero-alt.jpg"},
    {title:"Love Story Package",text:"Up to 4 Hours\n250+ Edited Photos\n2 Photographers\nCouple’s video\n$ 2,800",image:"/horizontal-1.jpg"},
  ],
  approachLabel:"Our approach", approachTitle:"Sincerity &\nPresence", approachText:"We're all about the real moments. We aim to be fully present with you, capturing the laughter, the quiet glances, and the emotions that make your story unique.", approachImage:"/hero.jpg",
  faqLabel:"FAQ", faqs:[
    {question:"How do I book a photo session with you?",answer:"Booking is easy. Reach out through our contact form and we’ll schedule a time to chat about your vision."},
    {question:"How long does it take to receive the final photos?",answer:"Your final images arrive within 4–6 weeks. We keep you updated throughout the editing process."},
    {question:"Can I order prints or albums through you?",answer:"Yes. We offer fine-art prints and custom albums designed to last a lifetime."},
  ],
};

export const dynamic = "force-dynamic";
function PackageText({ text, title }: { text: string; title: string }) {
  const lines = text.split("\n");
  return <>{lines.map((line, lineIndex) => <span className={lineIndex === lines.length - 1 ? "package-price" : undefined} key={`${title}-${lineIndex}`}>{line.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, partIndex) => part.startsWith("**") && part.endsWith("**") ? <strong key={partIndex}>{part.slice(2, -2)}</strong> : part)}</span>)}</>;
}

export default async function ServicePage(){const saved=await getSiteContent("service",fallback);const mistakenImage=/^https?:\/\//i.test(saved.heroTitle) ? saved.heroTitle : "";const packages=saved.packages.length>=4?saved.packages:[...saved.packages,{title:"New Service Package",text:"Up to 4 Hours\nEdited Photos\nOnline Gallery\n**$ 1,500**",image:"/horizontal-3.jpg"}];const c={...saved,packages,heroTitle:mistakenImage?fallback.heroTitle:saved.heroTitle,heroImage:saved.heroImage||mistakenImage||fallback.heroImage};return <main className="subpage" id="top"><SiteHeader transparent/><div>
  <section className="service-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,.64)),url("${c.heroImage}")`}}><div className="service-hero-copy"><h1>{c.heroTitle}</h1><p>{c.heroText}</p></div></section>
  <section className="packages">{c.packages.map((p,index)=><article className={`package-card package-card-${index + 1}`} key={p.title}><div className="package-copy"><h2>{p.title}</h2><p><PackageText text={p.text} title={p.title}/></p></div><img src={p.image} alt={p.title}/></article>)}</section>
  <section className="approach"><img src={c.approachImage} alt="Our approach"/><div><span className="page-label">{c.approachLabel}</span><h2>{c.approachTitle.split("\n").map(line=><span key={line}>{line}<br/></span>)}</h2><p>{c.approachText}</p></div></section>
  <section className="faq"><span className="page-label">{c.faqLabel}</span>{c.faqs.map(item=><div className="faq-row" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
  <ContactCta/><SiteFooter/>
 </div></main>}
