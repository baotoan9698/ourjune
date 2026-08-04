import { getServerSupabase } from "./supabase";

export type GalleryContent = {
  title: string;
  description: string;
  hero: string;
  images: string[];
};

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
