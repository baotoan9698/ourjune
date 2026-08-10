import { notFound } from "next/navigation";
import { GalleryTemplate } from "../components/GalleryTemplate";
import { getGalleryBySlug, type GalleryContent } from "../../lib/content";

export const dynamic = "force-dynamic";

export default async function CustomGalleryPage({ params }: { params: Promise<{ gallerySlug: string }> }) {
  const { gallerySlug } = await params;
  const row = await getGalleryBySlug(gallerySlug);
  if (!row) notFound();
  return <GalleryTemplate {...(row.value as GalleryContent)} />;
}
