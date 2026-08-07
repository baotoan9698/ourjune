import { getSiteContent } from "../../lib/content";
import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const fallback = {
  heroTitle:"More details about our services", heroText:"We believe your photos should feel as natural and honest as possible. Whether it's a portrait session, an intimate elopement, or a large celebration with loved ones, we capture it in a way that feels effortless and true to you.",
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
export default async function ServicePage(){const c=await getSiteContent("service",fallback);return <main className="subpage" id="top"><SiteHeader transparent/><div>
  <section className="service-hero"><div className="service-hero-copy"><h1>{c.heroTitle}</h1><p>{c.heroText}</p></div></section>
  <section className="packages">{c.packages.map((p,index)=><article className={`package-card package-card-${index + 1}`} key={p.title}><div className="package-copy"><h2>{p.title}</h2><p>{p.text.split("\n").map((line,lineIndex,lines)=><span className={lineIndex===lines.length-1?"package-price":undefined} key={`${p.title}-${lineIndex}`}>{line}</span>)}</p></div><img src={p.image} alt={p.title}/></article>)}</section>
  <section className="approach"><img src={c.approachImage} alt="Our approach"/><div><span className="page-label">{c.approachLabel}</span><h2>{c.approachTitle.split("\n").map(line=><span key={line}>{line}<br/></span>)}</h2><p>{c.approachText}</p></div></section>
  <section className="faq"><span className="page-label">{c.faqLabel}</span>{c.faqs.map(item=><div className="faq-row" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
  <ContactCta/><SiteFooter/>
 </div></main>}
