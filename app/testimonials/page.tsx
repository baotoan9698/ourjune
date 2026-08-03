import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const reviews=[
  ["/horizontal-3.jpg","Alex and Emma were amazing from start to finish. They made us feel so at ease and genuinely cared about our story.","Brie & Soren"],
  ["/portrait-2.jpg","I was nervous in front of the camera, but from the moment we started it felt like catching up with old friends.","Jennifer T."],
  ["/hero-alt.jpg","Their passion is evident in every image. They made us feel like part of their family.","Olli & Sophia"],
  ["/horizontal-1.jpg","They captured the little glances and unspoken words—the kind of love only someone who understands can preserve.","Justin & Nadia"],
  ["/portrait-4.jpg","Working with them was refreshing. They made me feel comfortable, natural, and completely at ease.","Hana K."],
  ["/vertical-2.jpg","They make you feel like you've known them forever. We're completely in love with the photos.","Maya & Devon"],
];
export default function TestimonialsPage(){return <main className="subpage" id="top"><SiteHeader/><div className="subpage-main">
  <section className="page-intro"><span className="page-label">Testimonials</span><h1 className="page-title">What our clients<br/>say</h1></section>
  <section className="testimonials-grid">{reviews.map(([image,quote,name])=><article className="testimonial-item" key={name}><img src={image} alt={`${name} testimonial`}/><p>{quote}</p><h2>{name}</h2></article>)}</section>
  <ContactCta image/><SiteFooter/>
 </div></main>}
