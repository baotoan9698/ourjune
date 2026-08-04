import { GalleryTemplate } from "../components/GalleryTemplate";
import { getSiteContent, type GalleryContent } from "../../lib/content";

const fallback: GalleryContent = {
  title: "Love Stories",
  description: "Every relationship is unique. We preserve the moments that define your story together—from quiet glances to windswept celebrations.",
  hero: "/horizontal-3.jpg",
  images: ["/portrait-2.jpg","/horizontal-3.jpg","/portrait-4.jpg","/hero-alt.jpg","/horizontal-1.jpg","/vertical-2.jpg","/hero.jpg","/portrait-1.jpg","/horizontal-3.jpg","/portrait-2.jpg","/horizontal-1.jpg"],
};

export const dynamic = "force-dynamic";
export default async function GalleryOne() {
  return <GalleryTemplate {...await getSiteContent("gallery-1", fallback)} />;
}
