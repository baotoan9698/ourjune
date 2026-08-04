-- Run this entire file once in Supabase > SQL Editor.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  key text primary key,
  page text not null,
  label text not null,
  value jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "Public can read published content" on public.site_content;
create policy "Public can read published content"
on public.site_content for select
using (true);

drop policy if exists "Admins can update content" on public.site_content;
create policy "Admins can update content"
on public.site_content for update to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Admins can insert content" on public.site_content;
create policy "Admins can insert content"
on public.site_content for insert to authenticated
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = true;

drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media"
on storage.objects for select
using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'site-media' and
  exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
on storage.objects for update to authenticated
using (
  bucket_id = 'site-media' and
  exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
on storage.objects for delete to authenticated
using (
  bucket_id = 'site-media' and
  exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

insert into public.site_content (key, page, label, sort_order, value) values
('gallery-1','Gallery','Gallery 1 — Love Stories',10,'{"title":"Love Stories","description":"Every relationship is unique. We preserve the moments that define your story together—from quiet glances to windswept celebrations.","hero":"/horizontal-3.jpg","images":["/portrait-2.jpg","/horizontal-3.jpg","/portrait-4.jpg","/hero-alt.jpg","/horizontal-1.jpg","/vertical-2.jpg","/hero.jpg","/portrait-1.jpg","/horizontal-3.jpg","/portrait-2.jpg","/horizontal-1.jpg"]}'::jsonb),
('gallery-2','Gallery','Gallery 2 — Portraits',20,'{"title":"Portraits","description":"Editorial portraits with honest expression, subtle movement, and an atmosphere that feels unmistakably personal.","hero":"/portrait-4.jpg","images":["/portrait-4.jpg","/portrait-1.jpg","/portrait-2.jpg","/horizontal-1.jpg","/hero.jpg","/vertical-2.jpg","/hero-alt.jpg","/portrait-1.jpg","/horizontal-3.jpg","/portrait-4.jpg","/horizontal-1.jpg"]}'::jsonb),
('gallery-3','Gallery','Gallery 3 — Weddings',30,'{"title":"Weddings","description":"Cinematic wedding photographs shaped by movement, connection, and all the beautiful moments that happen in between.","hero":"/hero-alt.jpg","images":["/hero-alt.jpg","/vertical-2.jpg","/horizontal-3.jpg","/hero.jpg","/portrait-2.jpg","/horizontal-1.jpg","/portrait-4.jpg","/portrait-1.jpg","/hero-alt.jpg","/horizontal-3.jpg","/vertical-2.jpg"]}'::jsonb),
('gallery-4','Gallery','Gallery 4 — Editorial',40,'{"title":"Editorial","description":"A study in light, texture, and quiet confidence—photographs made for artists, brands, and beautifully unconventional ideas.","hero":"/horizontal-1.jpg","images":["/horizontal-1.jpg","/portrait-2.jpg","/hero.jpg","/portrait-4.jpg","/vertical-2.jpg","/portrait-1.jpg","/hero-alt.jpg","/horizontal-3.jpg","/portrait-2.jpg","/horizontal-1.jpg","/portrait-4.jpg"]}'::jsonb)
on conflict (key) do nothing;

insert into public.site_content (key, page, label, sort_order, value) values
('home','Pages','Home',0,$json${"heroTitle":"Photographs of love,\njoy, and moments of\nlife that feel like a\nmovie","heroDescription":"Moody, cinematic, and deeply atmospheric, our photography renders the feeling within every moment — how it unfolds, how it lingers.","heroImage":"/hero.jpg","storyLabel":"01 — THE STORY","aboutTitle":"About us","aboutText1":"Hello! We're Alex and Emma, a husband-and-wife duo based in Joshua Tree, California.","aboutText2":"For us, photography means connection — with one another, with nature, and with parts of yourself you have yet to discover.","aboutImage1":"/portrait-1.jpg","aboutImage2":"/portrait-2.jpg","testimonials":[{"quote":"Being photographed by these two made all the difference. They just get it.","names":"Justin & Nadia","image":"/horizontal-3.jpg"},{"quote":"From the first conversation, we felt completely at ease.","names":"Maya & Elliot","image":"/horizontal-1.jpg"},{"quote":"Looking through our gallery felt like reliving the entire day.","names":"Sophie & Daniel","image":"/hero-alt.jpg"}],"quote":"Mystery is not about traveling to new places but about looking with new eyes.","quoteAuthor":"MARCEL PROUST","worksLabel":"02 — SELECTED STORIES","worksTitle":"Our Works","worksDescription":"A collection of honest moments, quiet gestures, and stories that deserve to live beyond the day they happened.","works":[{"title":"Portraits","image":"/portrait-4.jpg","href":"/gallery-2"},{"title":"Love Stories","image":"/horizontal-1.jpg","href":"/gallery-1"},{"title":"Weddings","image":"/vertical-2.jpg","href":"/gallery-3"}],"contactTitle":"Get in touch","contactText":"Send us a message, and we'll set up a free discovery call to start planning your dream elopement.","contactEmail":"hello@ourjune.photo","footerImages":["/portrait-1.jpg","/portrait-4.jpg","/horizontal-3.jpg","/hero.jpg"],"instagramHandle":"@OURJUNE","copyright":"© 2026 OUR JUNE"}$json$::jsonb),
('about','Pages','About',10,$json${"label":"About us","title":"We're so happy\nyou're here","introImage":"/portrait-1.jpg","introText":"We're Alex and Emma, a husband-and-wife team based in the California desert. We've been together for five years, and it's hard to imagine life without one another.","storyTitle":"Alex & Emma","storyText1":"When we're not behind the camera, you'll probably find us going on hikes, watching sunsets, or enjoying a slow morning.","storyText2":"Photography allows us to meet incredible people, tell their stories, and see the world in new ways.","storyImage":"/portrait-4.jpg","clientLabel":"Clients say","clientQuote":"Alex and Emma were amazing from start to finish. They made us feel so at ease.","clientName":"BRIE & SOREN JACKSON","servicesLabel":"What we do","services":"Portraits\nWeddings\nLove Stories\nCommercial","servicesImage":"/horizontal-1.jpg"}$json$::jsonb),
('service','Pages','Services',20,$json${"heroTitle":"More details about our services","heroText":"We believe your photos should feel as natural and honest as possible.","packages":[{"title":"Portraits Package","text":"Up to 2 Hours\n40–80 Edited Photos\n2 Prints\nOnline gallery\n$ 800","image":"/portrait-2.jpg"},{"title":"Wedding Package","text":"Up to 10 Hours\n600+ Edited Photos\n2 Photographers\n12×12 Photo Album\n$ 4,500","image":"/hero-alt.jpg"},{"title":"Love Story Package","text":"Up to 4 Hours\n250+ Edited Photos\n2 Photographers\nCouple’s video\n$ 2,800","image":"/horizontal-1.jpg"}],"approachLabel":"Our approach","approachTitle":"Sincerity &\nPresence","approachText":"We're all about the real moments and the emotions that make your story unique.","approachImage":"/hero.jpg","faqLabel":"FAQ","faqs":[{"question":"How do I book a photo session with you?","answer":"Reach out through our contact form and we’ll schedule a time to chat."},{"question":"How long does it take to receive the final photos?","answer":"Your final images arrive within 4–6 weeks."},{"question":"Can I order prints or albums through you?","answer":"Yes. We offer fine-art prints and custom albums."}]}$json$::jsonb),
('testimonials','Pages','Testimonials',30,$json${"label":"Testimonials","title":"What our clients\nsay","reviews":[{"image":"/horizontal-3.jpg","quote":"Alex and Emma were amazing from start to finish.","name":"Brie & Soren"},{"image":"/portrait-2.jpg","quote":"From the moment we started it felt like catching up with old friends.","name":"Jennifer T."},{"image":"/hero-alt.jpg","quote":"Their passion is evident in every image.","name":"Olli & Sophia"},{"image":"/horizontal-1.jpg","quote":"They captured the little glances and unspoken words.","name":"Justin & Nadia"},{"image":"/portrait-4.jpg","quote":"They made me feel comfortable, natural, and completely at ease.","name":"Hana K."},{"image":"/vertical-2.jpg","quote":"They make you feel like you've known them forever.","name":"Maya & Devon"}]}$json$::jsonb),
('portfolio','Pages','Portfolio',40,$json${"title":"Our Works","description":"Take a look through our collection of stories we've had the privilege of capturing.","collections":[{"title":"Portraits","href":"/gallery-2","image":"/portrait-4.jpg"},{"title":"Love Stories","href":"/gallery-1","image":"/horizontal-3.jpg"},{"title":"Weddings","href":"/gallery-3","image":"/hero-alt.jpg"},{"title":"Editorial","href":"/gallery-4","image":"/horizontal-1.jpg"}]}$json$::jsonb),
('contact','Pages','Contact',50,$json${"title":"Send us a\nmessage","email":"HELLO@OURJUNE.PHOTO","phone":"+84 555 583 655","image":"/portrait-1.jpg","nameLabel":"Name *","emailLabel":"Email address *","messageLabel":"Message *","buttonLabel":"Send message"}$json$::jsonb)
on conflict (key) do nothing;

-- After creating your Auth user, replace the email below and run this statement:
-- insert into public.admin_users(user_id)
-- select id from auth.users where email = 'YOUR-ADMIN-EMAIL' on conflict do nothing;
