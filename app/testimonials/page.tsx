import { getSiteContent } from "../../lib/content";
import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const fallback={label:"Testimonials",title:"What our clients\nsay",reviews:[
  {image:"/horizontal-3.jpg",quote:"Alex and Emma were amazing from start to finish. They made us feel so at ease and genuinely cared about our story.",name:"Brie & Soren"},
  {image:"/portrait-2.jpg",quote:"I was nervous in front of the camera, but from the moment we started it felt like catching up with old friends.",name:"Jennifer T."},
  {image:"/hero-alt.jpg",quote:"Their passion is evident in every image. They made us feel like part of their family.",name:"Olli & Sophia"},
  {image:"/horizontal-1.jpg",quote:"They captured the little glances and unspoken words—the kind of love only someone who understands can preserve.",name:"Justin & Nadia"},
  {image:"/portrait-4.jpg",quote:"Working with them was refreshing. They made me feel comfortable, natural, and completely at ease.",name:"Hana K."},
  {image:"/vertical-2.jpg",quote:"They make you feel like you've known them forever. We're completely in love with the photos.",name:"Maya & Devon"},
]};

export const dynamic = "force-dynamic";
export default async function TestimonialsPage(){const c=await getSiteContent("testimonials",fallback);return <main className="subpage" id="top"><SiteHeader/><div className="subpage-main">
  <section className="page-intro"><span className="page-label">{c.label}</span><h1 className="page-title">{c.title.split("\n").map(line=><span key={line}>{line}<br/></span>)}</h1></section>
  <section className="testimonials-grid">{c.reviews.map(review=><article className="testimonial-item" key={review.name}><img src={review.image} alt={`${review.name} testimonial`}/><p>{review.quote}</p><h2>{review.name}</h2></article>)}</section>
  <ContactCta/><SiteFooter/>
 </div></main>}
