"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "../../lib/supabase";
import "./admin.css";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type ContentRow = { key: string; page: string; label: string; value: JsonValue; sort_order: number };
type GalleryLinkOption = { label: string; value: string; legacy: string };

function isImageField(name: string) {
  return /images?\d*$/i.test(name) || /(^|_)(photo|portrait|background)\d*$/i.test(name) || name.toLowerCase() === "hero";
}
const fieldLabels: Record<string, string> = {
  menuTitle: "Tên hiển thị trên menu Portfolio",
  slug: "Slug đường dẫn (ví dụ: wedding-stories)",
  facebookUrl: "Link Facebook",
  instagramUrl: "Link Instagram",
  whatsappUrl: "Link WhatsApp",
};

function prepareContentValue(key: string, value: JsonValue): JsonValue {
  const copy = structuredClone(value);
  if (!copy || Array.isArray(copy) || typeof copy !== "object") return copy;
  const prepared = copy as Record<string, JsonValue>;
  if (key === "home") {
    if (typeof prepared.contactImage !== "string") prepared.contactImage = "/hero-alt.jpg";
    if (typeof prepared.facebookUrl !== "string") prepared.facebookUrl = "https://www.facebook.com/";
    if (typeof prepared.instagramUrl !== "string") prepared.instagramUrl = "https://www.instagram.com/";
    if (typeof prepared.whatsappUrl !== "string") prepared.whatsappUrl = "https://wa.me/84555583655";
    const works = Array.isArray(prepared.works) ? prepared.works : [];
    if (works.length < 4) prepared.works = [...works, { title: "New Story", image: "/horizontal-1.jpg", href: "/gallery-4" }];
  }
  if (key === "service") {
    const currentTitle = typeof prepared.heroTitle === "string" ? prepared.heroTitle : "";
    if (/^https?:\/\//i.test(currentTitle)) {
      if (typeof prepared.heroImage !== "string") prepared.heroImage = currentTitle;
      prepared.heroTitle = "More details about our services";
    }
    if (typeof prepared.heroImage !== "string") prepared.heroImage = "/horizontal-1.jpg";
    const packages = Array.isArray(prepared.packages) ? prepared.packages : [];
    if (packages.length < 4) prepared.packages = [...packages, { title: "New Service Package", text: "Up to 4 Hours\nEdited Photos\nOnline Gallery\n**$ 1,500**", image: "/horizontal-3.jpg" }];
  }
  if (key === "portfolio" && typeof prepared.heroImage !== "string") prepared.heroImage = "/hero.jpg";
  if (key.startsWith("gallery-")) {
    if (typeof prepared.menuTitle !== "string") prepared.menuTitle = typeof prepared.title === "string" ? prepared.title : key;
    if (typeof prepared.slug !== "string") prepared.slug = key;
    const current = Array.isArray(prepared.images) ? prepared.images : [];
    const source = current.length ? current : [typeof prepared.hero === "string" ? prepared.hero : ""];
    prepared.images = Array.from({ length: 16 }, (_, index) => structuredClone(source[index % source.length]));
  }
  return prepared;
}

function setAtPath(source: JsonValue, path: (string | number)[], next: JsonValue): JsonValue {
  if (!path.length) return next;
  const [head, ...tail] = path;
  if (Array.isArray(source)) {
    const copy = [...source];
    copy[Number(head)] = setAtPath(copy[Number(head)], tail, next);
    return copy;
  }
  const copy = { ...(source as Record<string, JsonValue>) };
  copy[String(head)] = setAtPath(copy[String(head)], tail, next);
  return copy;
}

function removeAtPath(source: JsonValue, path: (string | number)[]): JsonValue {
  const parent = path.slice(0, -1);
  const index = Number(path[path.length - 1]);
  let target: JsonValue = source;
  for (const part of parent) target = Array.isArray(target) ? target[Number(part)] : (target as Record<string, JsonValue>)[String(part)];
  if (!Array.isArray(target)) return source;
  const next = target.filter((_, i) => i !== index);
  return setAtPath(source, parent, next);
}

function FieldEditor({ name, value, path, onChange, onRemove, onUpload, uploading, galleryLinks }: {
  name: string; value: JsonValue; path: (string | number)[];
  onChange: (path: (string | number)[], value: JsonValue) => void;
  onRemove?: () => void;
  onUpload: (path: (string | number)[], file: File) => void;
  uploading: string;
  galleryLinks: GalleryLinkOption[];
}) {
  const pathId = path.join(".");
  if (Array.isArray(value)) return <fieldset className="admin-group">
    <legend>{name}</legend>
    <div className="admin-array">
      {value.map((item, index) => <div className="admin-array-item" key={`${pathId}-${index}`}>
        <FieldEditor name={`${name} ${index + 1}`} value={item} path={[...path, index]} onChange={onChange} onRemove={() => onChange(path, removeAtPath(value, [index]))} onUpload={onUpload} uploading={uploading} galleryLinks={galleryLinks} />
      </div>)}
    </div>
    <button type="button" className="admin-secondary" onClick={() => onChange(path, [...value, value.length ? structuredClone(value[value.length - 1]) : ""])}>+ Thêm mục</button>
  </fieldset>;

  if (value && typeof value === "object") return <fieldset className="admin-group">
    <legend>{name}</legend>
    {Object.entries(value).map(([key, child]) => <FieldEditor key={key} name={key} value={child} path={[...path, key]} onChange={onChange} onUpload={onUpload} uploading={uploading} galleryLinks={galleryLinks} />)}
    {onRemove && <button type="button" className="admin-danger-link" onClick={onRemove}>Xóa mục này</button>}
  </fieldset>;

  if (typeof value === "boolean") return <label className="admin-check"><input type="checkbox" checked={value} onChange={e => onChange(path, e.target.checked)} />{name}</label>;

  const isImage = isImageField(name) || path.some(part => isImageField(String(part)));
  const isGalleryImage = path.some(part => String(part) === "images");
  const isGalleryLink = name === "href" && path.some(part => ["works", "collections"].includes(String(part)));
  const isPackageText = name === "text" && path.some(part => String(part) === "packages");
  const isAboutServices = name === "services";
  const isRichText = isPackageText || isAboutServices;
  const text = String(value ?? "");
  const selectedGalleryLink = galleryLinks.find(option => option.value === text || option.legacy === text)?.value ?? text;
  const displayName = isRichText ? "Nội dung — xuống dòng bằng Enter, in đậm bằng **chữ**" : fieldLabels[name] || name;
  return <label className={`admin-field${isGalleryImage ? " admin-gallery-image" : ""}`}><span>{displayName}</span>
    {isGalleryLink ? <select value={selectedGalleryLink} onChange={e => onChange(path, e.target.value)}>{galleryLinks.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select> : isRichText || text.length > 90 ? <textarea rows={isRichText ? 8 : 4} value={text} onChange={e => onChange(path, e.target.value)} /> : <input value={text} onChange={e => onChange(path, typeof value === "number" ? Number(e.target.value) : e.target.value)} />}
    {isImage && <div className="admin-media-row">
      {text && <img src={text} alt="Xem trước" />}
      <label className="admin-upload">{uploading === pathId ? "Đang tải…" : "Tải hình mới"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={Boolean(uploading)} onChange={(event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) onUpload(path, file); event.target.value = ""; }} /></label>
    </div>}
    {onRemove && <button type="button" className="admin-danger-link" onClick={onRemove}>Xóa mục này</button>}
  </label>;
}

export default function AdminPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState<JsonValue>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (!supabase) { setLoading(false); return; }
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return router.replace("/admin/login");
    const { data, error } = await supabase.from("site_content").select("key,page,label,value,sort_order").order("page").order("sort_order");
    if (error) setMessage("Không đọc được dữ liệu. Hãy kiểm tra bước SQL và quyền admin.");
    const content = (data ?? []) as ContentRow[];
    setRows(content);
    if (content.length) {
      setSelected(current => current || content[0].key);
      setDraft(current => Object.keys(current as object).length ? current : prepareContentValue(content[0].key, content[0].value));
    }
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);
  const active = useMemo(() => rows.find(row => row.key === selected), [rows, selected]);
  const galleryLinks = useMemo<GalleryLinkOption[]>(() => rows.filter(row => row.key.startsWith("gallery-")).sort((a, b) => a.sort_order - b.sort_order).map(row => {
    const value = row.value && !Array.isArray(row.value) && typeof row.value === "object" ? row.value as Record<string, JsonValue> : {};
    return { label: String(value.menuTitle || value.title || row.label), value: `/${String(value.slug || row.key)}`, legacy: `/${row.key}` };
  }), [rows]);

  function choose(key: string) {
    const row = rows.find(item => item.key === key);
    if (!row) return;
    setSelected(key); setDraft(prepareContentValue(row.key, row.value)); setMessage("");
  }

  function update(path: (string | number)[], value: JsonValue) { setDraft(current => setAtPath(current, path, value)); }

  async function upload(path: (string | number)[], file: File) {
    if (file.size > 10 * 1024 * 1024) return setMessage("Hình phải nhỏ hơn 10 MB.");
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    const pathId = path.join("."); setUploading(pathId); setMessage("");
    const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const storagePath = `${selected}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("site-media").upload(storagePath, file, { cacheControl: "31536000", upsert: false });
    if (error) setMessage(`Không tải được hình: ${error.message}`);
    else {
      const { data } = supabase.storage.from("site-media").getPublicUrl(storagePath);
      update(path, data.publicUrl);
      setMessage("Đã tải hình. Nhấn Lưu thay đổi để xuất bản.");
    }
    setUploading("");
  }

  async function save() {
    const supabase = getBrowserSupabase();
    if (!supabase || !active) return;
    setSaving(true); setMessage("");
    let valueToSave = draft;
    if (["home", "portfolio"].includes(active.key) && draft && !Array.isArray(draft) && typeof draft === "object") {
      const page = structuredClone(draft as Record<string, JsonValue>);
      const listKey = active.key === "home" ? "works" : "collections";
      const items = Array.isArray(page[listKey]) ? page[listKey] as JsonValue[] : [];
      page[listKey] = items.map(item => {
        if (!item || Array.isArray(item) || typeof item !== "object") return item;
        const next = { ...(item as Record<string, JsonValue>) };
        const match = galleryLinks.find(option => option.legacy === String(next.href ?? ""));
        if (match) next.href = match.value;
        return next;
      });
      valueToSave = page;
      setDraft(page);
    }
    if (active.key.startsWith("gallery-") && draft && !Array.isArray(draft) && typeof draft === "object") {
      const gallery = { ...(draft as Record<string, JsonValue>) };
      const slug = String(gallery.slug ?? "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
      if (!slug) { setSaving(false); return setMessage("Slug không hợp lệ. Hãy nhập chữ, số hoặc dấu gạch ngang."); }
      const reservedSlugs = new Set(["about", "admin", "contact", "gallery", "portfolio", "service", "testimonials"]);
      if (reservedSlugs.has(slug)) { setSaving(false); return setMessage("Slug này trùng với một trang chính. Hãy chọn tên khác."); }
      const duplicate = rows.some(row => row.key !== active.key && row.key.startsWith("gallery-") && String((row.value as Record<string, JsonValue>)?.slug ?? row.key) === slug);
      if (duplicate) { setSaving(false); return setMessage("Slug này đang được một gallery khác sử dụng."); }
      gallery.slug = slug;
      gallery.menuTitle = String(gallery.menuTitle ?? gallery.title ?? active.label).trim();
      valueToSave = gallery;
      setDraft(gallery);
    }
    const { error } = await supabase.from("site_content").update({ value: valueToSave, updated_at: new Date().toISOString() }).eq("key", active.key);
    setSaving(false);
    if (error) return setMessage(error.code === "42501"
      ? "Tài khoản này chưa có quyền admin. Hãy thêm tài khoản vào bảng admin_users và kiểm tra policy RLS."
      : `Không lưu được: ${error.message}`);
    setRows(current => current.map(row => row.key === active.key ? { ...row, value: structuredClone(valueToSave) } : row));
    const channel = new BroadcastChannel("ourjune-content");
    channel.postMessage({ key: active.key });
    channel.close();
    setMessage("Đã lưu và xuất bản thành công.");
  }

  async function signOut() { await getBrowserSupabase()?.auth.signOut(); router.replace("/admin/login"); }

  if (loading) return <main className="admin-shell admin-loading">Đang mở Content Studio…</main>;
  return <main className="admin-shell admin-dashboard">
    <aside className="admin-sidebar">
      <div><a href="/" className="admin-brand">OUR JUNE</a><span className="admin-kicker">CONTENT STUDIO</span></div>
      <nav>{rows.map(row => <button className={selected === row.key ? "active" : ""} key={row.key} onClick={() => choose(row.key)}><small>{row.page}</small>{row.label}</button>)}</nav>
      <button className="admin-signout" onClick={signOut}>Đăng xuất</button>
    </aside>
    <section className="admin-workspace">
      <header><div><span className="admin-kicker">{active?.page ?? "SETUP"}</span><h1>{active?.label ?? "Chưa có dữ liệu"}</h1></div><div className="admin-actions"><a href={active?.key.startsWith("gallery-") && draft && !Array.isArray(draft) && typeof draft === "object" ? `/${String((draft as Record<string, JsonValue>).slug || active.key)}` : "/"} target="_blank">Xem trang ↗</a><button className="admin-primary" disabled={saving || !active} onClick={save}>{saving ? "Đang lưu…" : "Lưu thay đổi"}</button></div></header>
      {message && <div className="admin-notice">{message}</div>}
      {!active ? <div className="admin-empty"><h2>Chưa kết nối dữ liệu</h2><p>Chạy file <code>supabase/schema.sql</code> trong Supabase SQL Editor, sau đó tải lại trang.</p></div> : <div className="admin-editor"><FieldEditor name={active.label} value={draft} path={[]} onChange={update} onUpload={upload} uploading={uploading} galleryLinks={galleryLinks} /></div>}
    </section>
  </main>;
}
