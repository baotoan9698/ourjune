import { getServerSupabase } from "./supabase";

export type GalleryContent = {
  menuTitle?: string;
  slug?: string;
  title: string;
  description: string;
  hero: string;
  images: string[];
};

export type GalleryMenuItem = { key: string; title: string; slug: string };

export function normalizeGallerySlug(value: string, fallback: string) {
  const slug = value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
  return slug || fallback;
}

export async function getGalleryBySlug(slug: string) {
  const supabase = getServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from("site_content").select("key,value").eq("page", "Gallery").order("sort_order");
  if (error) return null;
  return (data ?? []).find(row => normalizeGallerySlug(String(row.value?.slug ?? row.key), row.key) === slug) ?? null;
}

export async function getSiteContent<T>(key: string, fallback: T): Promise<T> {
  const supabase = getServerSupabase();
  if (!supabase) return fallback;

  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error || !data?.value) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}
