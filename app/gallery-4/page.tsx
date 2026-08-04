import { GalleryTemplate } from "../components/GalleryTemplate";
import { getSiteContent, type GalleryContent } from "../../lib/content";

const fallback: GalleryContent = {
  title: "Editorial",
  description: "A study in light, texture, and quiet confidence—photographs made for artists, brands, and beautifully unconventional ideas.",
  hero: "/horizontal-1.jpg",
  images: ["/horizontal-1.jpg","/portrait-2.jpg","/hero.jpg","/portrait-4.jpg","/vertical-2.jpg","/portrait-1.jpg","/hero-alt.jpg","/horizontal-3.jpg","/portrait-2.jpg","/horizontal-1.jpg","/portrait-4.jpg"],
};

export const dynamic = "force-dynamic";
export default async function GalleryFour() {
  return <GalleryTemplate {...await getSiteContent("gallery-4", fallback)} />;
}
