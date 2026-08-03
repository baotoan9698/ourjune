import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

export default function AboutPage() {
  return <main className="subpage" id="top">
    <SiteHeader />
    <div className="subpage-main">
      <section className="page-intro"><span className="page-label">About us</span><h1 className="page-title">We&apos;re so happy<br/>you&apos;re here</h1></section>
      <section className="about-hero-grid"><img src="/portrait-1.jpg" alt="Our June photographers"/><p>We&apos;re Alex and Emma, a husband-and-wife team based in the California desert. We&apos;ve been together for five years, and it&apos;s hard to imagine life without one another. We believe our partnership strengthens every aspect of what we do, from our personal life to our photography work.</p></section>
      <section className="about-story">
        <div className="about-story-copy"><h2>Alex &amp; Emma</h2><div className="about-columns"><p>When we&apos;re not behind the camera, you&apos;ll probably find us going on hikes, watching sunsets, or enjoying a slow morning. Living simply and authentically shapes how we approach our work.</p><p>Photography allows us to meet incredible people, tell their stories, and see the world in new ways. Over the years, many of our couples have become lifelong friends.</p></div></div>
        <img src="/portrait-4.jpg" alt="Alex and Emma together"/>
      </section>
      <section className="client-say"><span className="page-label">Clients say</span><blockquote>Alex and Emma were amazing from start to finish. They made us feel so at ease, and it&apos;s clear they genuinely care about their clients.</blockquote><cite>BRIE &amp; SOREN JACKSON</cite></section>
      <section className="about-services"><img src="/horizontal-1.jpg" alt="Editorial portrait"/><div><span className="page-label">What we do</span><h3>Portraits<br/>Weddings<br/>Love Stories<br/>Commercial</h3></div></section>
      <ContactCta/><SiteFooter/>
    </div>
  </main>;
}
