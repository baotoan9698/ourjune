import { GalleryTemplate } from "../components/GalleryTemplate";
import { getSiteContent, type GalleryContent } from "../../lib/content";

const fallback: GalleryContent = {
  title: "Portraits",
  description: "Editorial portraits with honest expression, subtle movement, and an atmosphere that feels unmistakably personal.",
  hero: "/portrait-4.jpg",
  images: ["/portrait-4.jpg","/portrait-1.jpg","/portrait-2.jpg","/horizontal-1.jpg","/hero.jpg","/vertical-2.jpg","/hero-alt.jpg","/portrait-1.jpg","/horizontal-3.jpg","/portrait-4.jpg","/horizontal-1.jpg"],
};

export const dynamic = "force-dynamic";
export default async function GalleryTwo() {
  return <GalleryTemplate {...await getSiteContent("gallery-2", fallback)} />;
}
