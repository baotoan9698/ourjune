import { getSiteContent } from "../../lib/content";
import { ContactCta, SiteFooter, SiteHeader } from "../components/SiteChrome";

const fallback = {
  label: "About us", title: "We're so happy\nyou're here",
  introImage: "/portrait-1.jpg",
  introText: "We're Alex and Emma, a husband-and-wife team based in the California desert. We've been together for five years, and it's hard to imagine life without one another. We believe our partnership strengthens every aspect of what we do, from our personal life to our photography work.",
  storyTitle: "Alex & Emma",
  storyText1: "When we're not behind the camera, you'll probably find us going on hikes, watching sunsets, or enjoying a slow morning. Living simply and authentically shapes how we approach our work.",
  storyText2: "Photography allows us to meet incredible people, tell their stories, and see the world in new ways. Over the years, many of our couples have become lifelong friends.",
  storyImage: "/portrait-4.jpg", clientLabel: "Clients say",
  clientQuote: "Alex and Emma were amazing from start to finish. They made us feel so at ease, and it's clear they genuinely care about their clients.",
  clientName: "BRIE & SOREN JACKSON", servicesLabel: "What we do",
  services: "Portraits\nWeddings\nLove Stories\nCommercial", servicesImage: "/horizontal-1.jpg",
};

export const dynamic = "force-dynamic";
export default async function AboutPage() {
  const c = await getSiteContent("about", fallback);
  return <main className="subpage" id="top"><SiteHeader/><div className="subpage-main">
    <section className="page-intro"><span className="page-label">{c.label}</span><h1 className="page-title">{c.title.split("\n").map((line,i)=><span key={line}>{line}{i<c.title.split("\n").length-1&&<br/>}</span>)}</h1></section>
    <section className="about-hero-grid"><img src={c.introImage} alt="Our June photographers"/><p>{c.introText}</p></section>
    <section className="about-story"><div className="about-story-copy"><h2>{c.storyTitle}</h2><div className="about-columns"><p>{c.storyText1}</p><p>{c.storyText2}</p></div></div><img src={c.storyImage} alt="Our June photographers"/></section>
    <section className="client-say"><span className="page-label">{c.clientLabel}</span><blockquote>{c.clientQuote}</blockquote><cite>{c.clientName}</cite></section>
    <section className="about-services"><img src={c.servicesImage} alt="Our June services"/><div><span className="page-label">{c.servicesLabel}</span><h3>{c.services.split("\n").map(line=><span key={line}>{line}<br/></span>)}</h3></div></section>
    <ContactCta/><SiteFooter/>
  </div></main>;
}
