import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const packages=[
  {title:"Portraits Package",text:"Up to 2 Hours\n40–80 Edited Photos\n2 Prints\nOnline gallery\n$ 800",image:"/portrait-2.jpg"},
  {title:"Wedding Package",text:"Up to 10 Hours\n600+ Edited Photos\n2 Photographers\n12×12 Photo Album\n$ 4,500",image:"/hero-alt.jpg"},
  {title:"Love Story Package",text:"Up to 4 Hours\n250+ Edited Photos\n2 Photographers\nCouple’s video\n$ 2,800",image:"/horizontal-1.jpg"},
];
const faq=[
  ["How do I book a photo session with you?","Booking is easy. Reach out through our contact form and we’ll schedule a time to chat about your vision."],
  ["How long does it take to receive the final photos?","Your final images arrive within 4–6 weeks. We keep you updated throughout the editing process."],
  ["Can I order prints or albums through you?","Yes. We offer fine-art prints and custom albums designed to last a lifetime."],
];
export default function ServicePage(){return <main className="subpage" id="top"><SiteHeader transparent/><div>
  <section className="service-hero"><div className="service-hero-copy"><h1>More details about our services</h1><p>We believe your photos should feel as natural and honest as possible. Whether it&apos;s a portrait session, an intimate elopement, or a large celebration with loved ones, we capture it in a way that feels effortless and true to you.</p></div></section>
  <section className="packages">{packages.map(p=><article className="package-card" key={p.title}><h2>{p.title}</h2><p>{p.text}</p><img src={p.image} alt={p.title}/></article>)}</section>
  <section className="approach"><img src="/hero.jpg" alt="Our honest approach"/><div><span className="page-label">Our approach</span><h2>Sincerity &amp;<br/>Presence</h2><p>We&apos;re all about the real moments. We aim to be fully present with you, capturing the laughter, the quiet glances, and the emotions that make your story unique.</p></div></section>
  <section className="faq"><span className="page-label">FAQ</span>{faq.map(([q,a])=><div className="faq-row" key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
  <ContactCta/><SiteFooter/>
 </div></main>}
