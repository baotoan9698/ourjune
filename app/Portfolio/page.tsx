import { getSiteContent } from "../../lib/content";
import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const fallback={title:"Our Works",description:"Take a look through our collection of stories we've had the privilege of capturing. We hope these images give you a glimpse into our approach and open excitement for your own photography journey with us.",collections:[
  {title:"Portraits",href:"/gallery-2",image:"/portrait-4.jpg"},{title:"Love Stories",href:"/gallery-1",image:"/horizontal-3.jpg"},{title:"Weddings",href:"/gallery-3",image:"/hero-alt.jpg"},{title:"Editorial",href:"/gallery-4",image:"/horizontal-1.jpg"},
]};

export const dynamic = "force-dynamic";
export default async function PortfolioPage(){const c=await getSiteContent("portfolio",fallback);return <main className="subpage portfolio-page" id="top">
  <SiteHeader transparent/><section className="portfolio-hero"><div className="portfolio-hero-copy"><h1>{c.title}</h1><p>{c.description}</p></div></section>
  <section className="portfolio-collections">{c.collections.map((item,index)=><a className={`portfolio-project project-${index+1}`} href={item.href} key={item.href}><span>View Gallery</span><img src={item.image} alt={item.title}/><h2>{item.title}</h2></a>)}</section>
  <ContactCta/><SiteFooter/>
 </main>}
