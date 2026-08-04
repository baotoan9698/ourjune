import { getSiteContent } from "../../lib/content";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const fallback={title:"Send us a\nmessage",email:"HELLO@OURJUNE.PHOTO",phone:"+84 555 583 655",image:"/portrait-1.jpg",nameLabel:"Name *",emailLabel:"Email address *",messageLabel:"Message *",buttonLabel:"Send message"};

export const dynamic = "force-dynamic";
export default async function ContactPage(){const c=await getSiteContent("contact",fallback);return <main className="subpage" id="top"><SiteHeader/><div className="subpage-main">
  <section className="contact-page-head"><h1>{c.title.split("\n").map(line=><span key={line}>{line}<br/></span>)}</h1><div className="contact-details">EMAIL: {c.email}<br/>TEL: {c.phone}</div></section>
  <section className="contact-layout"><form className="contact-form"><label>{c.nameLabel}<input name="name" required/></label><label>{c.emailLabel}<input name="email" type="email" required/></label><label>{c.messageLabel}<textarea name="message" required/></label><button type="submit">{c.buttonLabel}</button></form><img src={c.image} alt="Our June photographers"/></section>
  <SiteFooter/>
 </div></main>}
