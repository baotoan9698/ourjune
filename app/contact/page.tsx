import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export default function ContactPage(){return <main className="subpage" id="top"><SiteHeader/><div className="subpage-main">
  <section className="contact-page-head"><h1>Send us a<br/>message</h1><div className="contact-details">EMAIL: HELLO@OURJUNE.PHOTO<br/>TEL: +84 555 583 655</div></section>
  <section className="contact-layout"><form className="contact-form"><label>Name *<input name="name" required/></label><label>Email address *<input name="email" type="email" required/></label><label>Message *<textarea name="message" required/></label><button type="submit">Send message</button></form><img src="/portrait-1.jpg" alt="Our June photographers"/></section>
  <SiteFooter/>
 </div></main>}
