import { GalleryTemplate } from "../components/GalleryTemplate";
import { getSiteContent, type GalleryContent } from "../../lib/content";

const fallback: GalleryContent = {
  title: "Weddings",
  description: "Cinematic wedding photographs shaped by movement, connection, and all the beautiful moments that happen in between.",
  hero: "/hero-alt.jpg",
  images: ["/hero-alt.jpg","/vertical-2.jpg","/horizontal-3.jpg","/hero.jpg","/portrait-2.jpg","/horizontal-1.jpg","/portrait-4.jpg","/portrait-1.jpg","/hero-alt.jpg","/horizontal-3.jpg","/vertical-2.jpg"],
};

export const dynamic = "force-dynamic";
export default async function GalleryThree() {
  return <GalleryTemplate {...await getSiteContent("gallery-3", fallback)} />;
}
